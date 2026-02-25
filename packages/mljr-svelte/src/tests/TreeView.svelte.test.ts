import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import TreeView from '../lib/components/display/TreeView.svelte';
import type { TreeNode } from '../lib/components/display/TreeView.svelte';

const sampleNodes: TreeNode[] = [
  {
    id: 'root',
    label: 'Root',
    children: [
      {
        id: 'child1',
        label: 'Child 1',
        children: [
          { id: 'grandchild1', label: 'Grandchild 1' },
          { id: 'grandchild2', label: 'Grandchild 2' },
        ],
      },
      { id: 'child2', label: 'Child 2' },
    ],
  },
  { id: 'standalone', label: 'Standalone Node' },
];

describe('TreeView', () => {
  describe('Rendering', () => {
    it('renders tree element', async () => {
      const { container } = render(TreeView, { nodes: sampleNodes });
      expect(container.querySelector('.mljr-tree')).toBeTruthy();
    });

    it('renders root level nodes', async () => {
      const { container } = render(TreeView, { nodes: sampleNodes });
      const nodeRows = container.querySelectorAll('.mljr-tree-node-row');
      // Only root-level nodes visible initially (collapsed)
      expect(nodeRows.length).toBeGreaterThanOrEqual(2);
    });

    it('renders labels for nodes', async () => {
      const { container } = render(TreeView, { nodes: sampleNodes });
      const labels = container.querySelectorAll('.mljr-tree-node-label');
      expect(labels.length).toBeGreaterThan(0);
      // Check label text
      const labelTexts = Array.from(labels).map(el => el.textContent?.trim());
      expect(labelTexts).toContain('Root');
    });
  });

  describe('Expand/Collapse', () => {
    it('shows toggle for nodes with children', async () => {
      const { container } = render(TreeView, { nodes: sampleNodes });
      const toggles = container.querySelectorAll('.mljr-tree-toggle');
      expect(toggles.length).toBeGreaterThan(0);
    });

    it('expands node when toggle is clicked', async () => {
      const { container } = render(TreeView, { nodes: sampleNodes });
      // Initially collapsed (no defaultExpanded)
      expect(container.querySelector('.mljr-tree-children')).toBeNull();
      const toggle = container.querySelector('.mljr-tree-toggle') as HTMLElement;
      toggle?.click();
      // After expansion, children container should appear
      await new Promise(r => setTimeout(r, 10));
      const children = container.querySelector('.mljr-tree-children');
      expect(children).toBeTruthy();
    });

    it('auto-expands defaultExpanded nodes', async () => {
      const { container } = render(TreeView, {
        nodes: sampleNodes,
        defaultExpanded: ['root'],
      });
      expect(container.querySelector('.mljr-tree-children')).toBeTruthy();
    });
  });

  describe('Selection', () => {
    it('selects node when clicked', async () => {
      const handleSelect = vi.fn();
      const { container } = render(TreeView, {
        nodes: sampleNodes,
        onSelect: handleSelect,
      });
      const nodeRow = container.querySelector('.mljr-tree-node-row') as HTMLElement;
      nodeRow?.click();
      expect(handleSelect).toHaveBeenCalled();
    });

    it('marks selected node with selected class', async () => {
      const { container } = render(TreeView, {
        nodes: sampleNodes,
        selected: ['root'],
      });
      expect(container.querySelector('.mljr-tree-node-row-selected')).toBeTruthy();
    });
  });

  describe('Checkable', () => {
    it('renders checkboxes when checkable', async () => {
      const { container } = render(TreeView, { nodes: sampleNodes, checkable: true });
      const checkboxes = container.querySelectorAll('.mljr-tree-checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });
  });

  describe('Disabled Nodes', () => {
    it('applies disabled class to disabled nodes', async () => {
      const disabledNodes: TreeNode[] = [
        { id: 'disabled-node', label: 'Disabled', disabled: true },
      ];
      const { container } = render(TreeView, { nodes: disabledNodes });
      expect(container.querySelector('.mljr-tree-node-row-disabled')).toBeTruthy();
    });
  });

  describe('Search', () => {
    it('highlights matching nodes when searchQuery provided', async () => {
      const { container } = render(TreeView, {
        nodes: sampleNodes,
        searchQuery: 'Child',
      });
      // Search should cause matching nodes to be visible
      const highlights = container.querySelectorAll('.mljr-tree-node-highlight');
      expect(highlights.length).toBeGreaterThan(0);
    });
  });

  describe('Lines variant', () => {
    it('applies line class when lines is true', async () => {
      const { container } = render(TreeView, { nodes: sampleNodes, lines: true });
      expect(container.querySelector('.mljr-tree-line')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has tree role', async () => {
      const { container } = render(TreeView, { nodes: sampleNodes });
      expect(container.querySelector('[role="tree"]')).toBeTruthy();
    });

    it('has treeitem role on nodes', async () => {
      const { container } = render(TreeView, { nodes: sampleNodes });
      expect(container.querySelector('[role="treeitem"]')).toBeTruthy();
    });
  });
});
