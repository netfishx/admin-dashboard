"use client";

import { TreeSelect } from "@/components/ui/tree-select";
import type { Permission, TreeNode } from "@/lib/types";

function arrayToTree(
  permissions: Permission[],
  checked: number[],
): [TreeNode[], Map<number, boolean | "indeterminate">] {
  // 创建Map来存储所有节点，方便快速查找
  const nodeMap = new Map<number, TreeNode>();
  // 创建Map来存储节点的选中状态
  const checkedState = new Map<number, boolean | "indeterminate">();

  // 判断节点是否应该显示
  const shouldShowNode = (id: number): boolean => {
    const permission = permissions.find((p) => p.id === id);
    if (!permission) {
      return false;
    }

    // 如果类型不为0，直接显示
    if (permission.permsType !== 0) {
      return true;
    }

    // 如果类型为0，检查是否有子节点
    return permissions.some((item) => item.parentId === id);
  };

  // 第一次遍历：创建所有应该显示的节点
  permissions.forEach((item) => {
    if (shouldShowNode(item.id)) {
      nodeMap.set(item.id, {
        id: item.id,
        label: item.permsName,
        type: item.permsType,
      });
    }
  });

  // 辅助函数：判断节点是否为叶子节点
  const isLeafNode = (id: number): boolean => {
    return !permissions.some((item) => item.parentId === id);
  };

  // 辅助函数：获取节点的所有子节点ID
  const getChildrenIds = (id: number): number[] => {
    return permissions
      .filter((item) => item.parentId === id && shouldShowNode(item.id))
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
    const siblingsStates = siblings.map((id) => checkedState.get(id) ?? false);

    if (siblingsStates.every((state) => state === true)) {
      checkedState.set(parentPermission.parentId, true);
    } else if (
      siblingsStates.some(
        (state) => state === true || state === "indeterminate",
      )
    ) {
      checkedState.set(parentPermission.parentId, "indeterminate");
    } else {
      checkedState.set(parentPermission.parentId, false);
    }

    // 递归更新上层父节点
    updateParentState(parentPermission.parentId);
  };

  // 第二次遍历：建立父子关系
  permissions.forEach((item) => {
    if (!shouldShowNode(item.id)) {
      return;
    }

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
      checkedState.set(item.id, checked.includes(item.id));
      if (item.parentId !== undefined) {
        updateParentState(item.id);
      }
    }
  });

  // 获取根节点(同时过滤掉不应该显示的节点)
  const roots = permissions
    .filter((item) => !item.parentId && shouldShowNode(item.id))
    .map((item) => nodeMap.get(item.id))
    .filter((node): node is TreeNode => !!node)
    .sort((a, b) => a.id - b.id);

  return [roots, checkedState];
}

export function PermissionTree({
  permissions,
  checked,
  onChangeAction,
  className,
}: {
  permissions: Permission[];
  checked: number[];
  onChangeAction: (checked: number[]) => void;
  className?: string;
}) {
  const [tree, checkedState] = arrayToTree(permissions, checked);

  function handleChangeAction(checked: Map<number, boolean | "indeterminate">) {
    onChangeAction(
      permissions
        .filter((item) => checked.get(item.id) === true && item.permsType === 1)
        .map((item) => item.id),
    );
  }
  return (
    <TreeSelect
      className={className}
      data={tree}
      checkedState={checkedState}
      handleChangeAction={handleChangeAction}
    />
  );
}
