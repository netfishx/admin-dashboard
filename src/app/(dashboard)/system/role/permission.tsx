"use client";

import { TreeSelect } from "@/components/ui/tree-select";
import type { Permission, TreeNode } from "@/lib/types";
import { useEffect, useState } from "react";

function arrayToTree(
  permissions: Permission[],
  checked: number[],
): [TreeNode[], Map<string, boolean | "indeterminate">] {
  // 创建Map来存储所有节点，方便快速查找
  const nodeMap = new Map<number, TreeNode>();
  // 创建Map来存储节点的选中状态
  const checkedState = new Map<string, boolean | "indeterminate">();

  // 第一次遍历：创建所有节点
  permissions.forEach((item) => {
    nodeMap.set(item.id, {
      id: item.id.toString(),
      label: item.permsName,
    });
  });

  // 辅助函数：判断节点是否为叶子节点
  const isLeafNode = (id: number): boolean => {
    return !permissions.some((item) => item.parentId === id);
  };

  // 辅助函数：获取节点的所有子节点ID
  const getChildrenIds = (id: number): number[] => {
    return permissions
      .filter((item) => item.parentId === id)
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

    // 递归更新上层父节点
    updateParentState(parentPermission.parentId);
  };

  // 第二次遍历：建立父子关系
  permissions.forEach((item) => {
    const currentNode = nodeMap.get(item.id);
    if (item.parentId) {
      const parentNode = nodeMap.get(item.parentId);
      if (parentNode && currentNode) {
        if (!parentNode.children) {
          parentNode.children = [];
        }
        parentNode.children.push(currentNode);
      }
    }

    // 设置叶子节点的选中状态
    if (isLeafNode(item.id)) {
      checkedState.set(item.id.toString(), checked.includes(item.id));
      if (item.parentId !== undefined) {
        updateParentState(item.id);
      }
    }
  });
  // 获取根节点
  const roots = permissions
    .filter((item) => !item.parentId)
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
