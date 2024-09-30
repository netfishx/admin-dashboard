import { type TreeNode, TreeSelect } from "@/components/ui/tree-select";

export default function TreePage() {
  const treeData: TreeNode[] = [
    {
      id: "0-0",
      label: "0-0",
      children: [
        {
          id: "0-0-0",
          label: "0-0-0",
          children: [
            { id: "0-0-0-0", label: "0-0-0-0" },
            { id: "0-0-0-1", label: "0-0-0-1" },
            { id: "0-0-0-2", label: "0-0-0-2" },
          ],
        },
        {
          id: "0-0-1",
          label: "0-0-1",
          children: [
            { id: "0-0-1-0", label: "0-0-1-0" },
            { id: "0-0-1-1", label: "0-0-1-1" },
            { id: "0-0-1-2", label: "0-0-1-2" },
          ],
        },
        { id: "0-0-2", label: "0-0-2" },
      ],
    },
    {
      id: "0-1",
      label: "0-1",
      children: [
        { id: "0-1-0-0", label: "0-1-0-0" },
        { id: "0-1-0-1", label: "0-1-0-1" },
        { id: "0-1-0-2", label: "0-1-0-2" },
      ],
    },
    { id: "0-2", label: "0-2" },
  ];
  return <TreeSelect data={treeData} />;
}
