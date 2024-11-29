"use client";

import { TreeSelect } from "@/components/ui/tree-select";
import type { Permission, TreeNode } from "@/lib/types";
import { useEffect, useState } from "react";

function arrayToTree(
  permissions: Permission[],
  checked: number[],
): [TreeNode[], Map<string, boolean | "indeterminate">] {
  const nodeMap = new Map<number, TreeNode>();
  const checkedState = new Map<string, boolean | "indeterminate">();

  // 辅助函数：检查节点是否具有叶子节点后代
  const hasLeafDescendant = (nodeId: number): boolean => {
    const children = permissions.filter((item) => item.parentId === nodeId);

    // 如果直接子节点中有叶子节点，返回true
    if (children.some((child) => child.permsType === 1)) {
      return true;
    }

    // 递归检查每个非叶子节点的子节点
    return children
      .filter((child) => child.permsType === 0)
      .some((child) => hasLeafDescendant(child.id));
  };

  // 第一次遍历：创建所有节点
  permissions.forEach((item) => {
    // 只创建叶子节点或有叶子节点后代的非叶子节点
    if (item.permsType === 1 || hasLeafDescendant(item.id)) {
      nodeMap.set(item.id, {
        id: item.id.toString(),
        label: item.permsName,
      });
    }
  });

  // 辅助函数：获取节点的有效子节点ID（已经在nodeMap中的节点）
  const getChildrenIds = (id: number): number[] => {
    return permissions
      .filter((item) => item.parentId === id && nodeMap.has(item.id))
      .map((item) => item.id);
  };

  // 辅助函数：更新父节点的选中状态
  const updateParentState = (nodeId: number) => {
    const parentPermission = permissions.find((p) => p.id === nodeId);
    if (!parentPermission?.parentId) {
      return;
    }

    const parentNode = nodeMap.get(parentPermission.parentId);
    if (!parentNode) {
      return;
    }

    const siblings = getChildrenIds(parentPermission.parentId);
    const siblingsStates = siblings.map(
      (id) => checkedState.get(id.toString()) ?? false,
    );

    if (siblingsStates.every((state) => state === true)) {
      checkedState.set(parentPermission.parentId.toString(), true);
    } else if (
      siblingsStates.some(
        (state) => state === true || state === "indeterminate",
      )
    ) {
      checkedState.set(parentPermission.parentId.toString(), "indeterminate");
    } else {
      checkedState.set(parentPermission.parentId.toString(), false);
    }

    updateParentState(parentPermission.parentId);
  };

  // 第二次遍历：建立父子关系
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
  permissions.forEach((item) => {
    if (!nodeMap.has(item.id)) {
      return; // 跳过未纳入nodeMap的节点
    }

    const currentNode = nodeMap.get(item.id);
    if (item.parentId !== undefined) {
      const parentNode = nodeMap.get(item.parentId);
      if (parentNode && currentNode) {
        if (!parentNode.children) {
          parentNode.children = [];
        }
        parentNode.children.push(currentNode);
      }
    }

    // 只为叶子节点设置选中状态
    if (item.permsType === 1) {
      checkedState.set(item.id.toString(), checked.includes(item.id));
      if (item.parentId !== undefined) {
        updateParentState(item.id);
      }
    }
  });

  // 获取根节点
  const roots = permissions
    .filter((item) => item.parentId === undefined && nodeMap.has(item.id))
    .map((item) => nodeMap.get(item.id))
    .filter((node): node is TreeNode => !!node);

  return [roots, checkedState];
}

export function PermissionTree({
  permissions,
  checked,
  onChangeAction,
}: {
  permissions: Permission[];
  checked: number[];
  onChangeAction: (checked: number[]) => void;
}) {
  const [tree, checkedState] = arrayToTree(permissions, checked);

  const [state, setState] = useState(checkedState);
  useEffect(() => {
    onChangeAction(
      permissions
        .filter(
          (item) =>
            state.get(item.id.toString()) === true && item.permsType === 1,
        )
        .map((item) => item.id),
    );
  }, [permissions, state, onChangeAction]);
  return (
    <TreeSelect
      data={tree}
      checkedState={state}
      handleChangeAction={setState}
    />
  );
}
