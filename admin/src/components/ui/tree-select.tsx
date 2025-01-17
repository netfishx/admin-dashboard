"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { TreeNode as TreeNodeType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

function TreeNode({
  node,
  level = 0,
  onCheck,
  checkedState,
}: {
  node: TreeNodeType;
  level?: number;
  onCheck: (id: number, checked: boolean | "indeterminate") => void;
  checkedState: Map<number, boolean | "indeterminate">;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const checked = checkedState.get(node.id);

  const handleCheck = (checked: boolean) => {
    onCheck(node.id, checked);
  };

  return (
    <div className="flex flex-col">
      <div className={`flex items-center py-1 ${level > 0 ? "ml-6" : ""}`}>
        <div className="flex items-center">
          {hasChildren && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
              }}
              className="mr-1 focus:outline-hidden"
              aria-label={isOpen ? "Collapse" : "Expand"}
            >
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
          {!hasChildren && <span className="w-5" />}
          <Checkbox
            id={node.id.toString()}
            checked={checked}
            onCheckedChange={handleCheck}
          />
          <label
            htmlFor={node.id.toString()}
            className="ml-2 cursor-pointer select-none text-sm"
          >
            {node.label}
          </label>
        </div>
      </div>
      {isOpen && hasChildren && (
        <div className="ml-6">
          {node.children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onCheck={onCheck}
              checkedState={checkedState}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function getDescendants(node: TreeNodeType): number[] {
  let descendants: number[] = [node.id];
  if (node.children) {
    node.children.forEach((child) => {
      descendants = descendants.concat(getDescendants(child));
    });
  }
  return descendants;
}

function getAncestors(id: number, nodes: TreeNodeType[]): number[] {
  for (const node of nodes) {
    if (node.id === id) {
      return [node.id];
    }
    if (node.children) {
      const path = getAncestors(id, node.children);
      if (path.length > 0) {
        return [node.id, ...path];
      }
    }
  }
  return [];
}

function findNode(id: number, nodes: TreeNodeType[]): TreeNodeType | null {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      const found = findNode(id, node.children);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export function TreeSelect({
  data,
  checkedState: state,
  handleChangeAction,
  className,
}: {
  data: TreeNodeType[];
  checkedState: Map<number, boolean | "indeterminate">;
  handleChangeAction: (
    checkedState: Map<number, boolean | "indeterminate">,
  ) => void;
  className?: string;
}) {
  const [checkedState, setCheckedState] =
    useState<Map<number, boolean | "indeterminate">>(state);

  const updateCheckedState = (
    id: number,
    checked: boolean | "indeterminate",
  ) => {
    const newCheckedState = new Map(checkedState);

    const updateDescendants = (nodeId: number, state: boolean) => {
      const node = findNode(nodeId, data);
      if (node) {
        const descendants = getDescendants(node);
        descendants.forEach((descId) => {
          newCheckedState.set(descId, state);
        });
      }
    };

    const updateAncestors = (nodeId: number) => {
      const ancestors = getAncestors(nodeId, data);
      ancestors
        .slice(0, -1)
        .reverse()
        .forEach((ancId) => {
          const node = findNode(ancId, data);
          if (node?.children) {
            const childStates = node.children.map((child) =>
              newCheckedState.get(child.id),
            );
            if (childStates.every((state) => state === true)) {
              newCheckedState.set(ancId, true);
            } else if (
              childStates.some(
                (state) => state === true || state === "indeterminate",
              )
            ) {
              newCheckedState.set(ancId, "indeterminate");
            } else {
              newCheckedState.set(ancId, false);
            }
          }
        });
    };

    if (checked === "indeterminate") {
      newCheckedState.set(id, false);
      updateDescendants(id, false);
    } else {
      newCheckedState.set(id, checked);
      updateDescendants(id, checked);
    }
    updateAncestors(id);

    setCheckedState(newCheckedState);
    handleChangeAction(newCheckedState);
  };

  const handleCheck = (id: number, checked: boolean | "indeterminate") => {
    updateCheckedState(id, checked);
  };

  return (
    <div
      className={cn("w-full overflow-y-auto rounded-md border p-4", className)}
    >
      {data.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onCheck={handleCheck}
          checkedState={checkedState}
        />
      ))}
    </div>
  );
}
