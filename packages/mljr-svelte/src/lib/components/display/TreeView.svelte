<script module lang="ts">
  export interface TreeNode {
    id: string;
    label: string;
    icon?: string;
    children?: TreeNode[];
    disabled?: boolean;
    data?: unknown;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { untrack } from 'svelte';
  import Icon from '../layout/Icon.svelte';

  interface Props {
    /** Tree data */
    nodes: TreeNode[];
    /** Selected node IDs */
    selected?: string[];
    /** Whether to show checkboxes */
    checkable?: boolean;
    /** Whether multiple selection is allowed */
    multiple?: boolean;
    /** Whether to show connecting lines */
    lines?: boolean;
    /** Whether to use compact size */
    compact?: boolean;
    /** Initially expanded node IDs */
    defaultExpanded?: string[];
    /** Search query to filter/highlight nodes */
    searchQuery?: string;
    /** Custom node content snippet */
    nodeContent?: Snippet<[TreeNode]>;
    /** Enable drag & drop to reorder nodes */
    draggable?: boolean;
    /** Additional CSS class */
    class?: string;
    /** Node select callback */
    onSelect?: (selected: string[], node: TreeNode) => void;
    /** Node expand/collapse callback */
    onExpand?: (nodeId: string, expanded: boolean) => void;
    /** Called after a drag & drop with the updated node tree */
    onDrop?: (updatedNodes: TreeNode[]) => void;
  }

  let {
    nodes,
    selected = $bindable([]),
    checkable = false,
    multiple = false,
    lines = true,
    compact = false,
    defaultExpanded = [],
    searchQuery = '',
    nodeContent,
    draggable = false,
    class: className = '',
    onSelect,
    onExpand,
    onDrop,
  }: Props = $props();

  // Track expanded state - intentionally captures defaultExpanded only at mount (like defaultValue)
  // svelte-ignore state_referenced_locally
  let expanded = $state<Set<string>>(new Set<string>(defaultExpanded));

  function toggleExpand(nodeId: string) {
    const isExpanded = expanded.has(nodeId);
    if (isExpanded) {
      expanded.delete(nodeId);
    } else {
      expanded.add(nodeId);
    }
    expanded = new Set(expanded);
    onExpand?.(nodeId, !isExpanded);
  }

  function selectNode(node: TreeNode) {
    if (node.disabled) return;

    if (checkable) {
      toggleCheck(node);
    } else if (multiple) {
      const idx = selected.indexOf(node.id);
      if (idx >= 0) {
        selected = selected.filter(id => id !== node.id);
      } else {
        selected = [...selected, node.id];
      }
      onSelect?.(selected, node);
    } else {
      selected = [node.id];
      onSelect?.(selected, node);
    }
  }

  function toggleCheck(node: TreeNode) {
    const allDescendantIds = getAllDescendantIds(node);
    const allSelected = allDescendantIds.every(id => selected.includes(id));

    if (allSelected) {
      // Deselect node and all descendants
      selected = selected.filter(id => !allDescendantIds.includes(id) && id !== node.id);
    } else {
      // Select node and all descendants
      const toAdd = [node.id, ...allDescendantIds].filter(id => !selected.includes(id));
      selected = [...selected, ...toAdd];
    }
    onSelect?.(selected, node);
  }

  function getAllDescendantIds(node: TreeNode): string[] {
    if (!node.children) return [];
    return node.children.flatMap(child => [child.id, ...getAllDescendantIds(child)]);
  }

  function getCheckState(node: TreeNode): 'checked' | 'indeterminate' | 'unchecked' {
    if (!node.children || node.children.length === 0) {
      return selected.includes(node.id) ? 'checked' : 'unchecked';
    }
    const allIds = [node.id, ...getAllDescendantIds(node)];
    const selectedCount = allIds.filter(id => selected.includes(id)).length;
    if (selectedCount === 0) return 'unchecked';
    if (selectedCount === allIds.length) return 'checked';
    return 'indeterminate';
  }

  function matchesSearch(node: TreeNode): boolean {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    if (node.label.toLowerCase().includes(query)) return true;
    if (node.children) return node.children.some(child => matchesSearch(child));
    return false;
  }

  function isVisible(node: TreeNode): boolean {
    if (!searchQuery) return true;
    return matchesSearch(node);
  }

  function highlightText(text: string): string {
    if (!searchQuery) return text;
    const query = searchQuery.toLowerCase();
    const idx = text.toLowerCase().indexOf(query);
    if (idx < 0) return text;
    return (
      text.slice(0, idx) +
      `<mark class="mljr-tree-node-highlight">${text.slice(idx, idx + query.length)}</mark>` +
      text.slice(idx + query.length)
    );
  }

  /* ── Drag & Drop ── */
  type DropPos = 'before' | 'after' | 'inside';
  let dragId: string | null = $state(null);
  let dropTargetId: string | null = $state(null);
  let dropPos: DropPos = $state('inside');

  function findAndRemove(nodeList: TreeNode[], id: string): [TreeNode | null, TreeNode[]] {
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].id === id) {
        const removed = nodeList[i];
        return [removed, [...nodeList.slice(0, i), ...nodeList.slice(i + 1)]];
      }
      if (nodeList[i].children?.length) {
        const [removed, newChildren] = findAndRemove(nodeList[i].children!, id);
        if (removed) {
          const newNode = { ...nodeList[i], children: newChildren };
          return [removed, [...nodeList.slice(0, i), newNode, ...nodeList.slice(i + 1)]];
        }
      }
    }
    return [null, nodeList];
  }

  function insertAt(nodeList: TreeNode[], targetId: string, pos: DropPos, toInsert: TreeNode): TreeNode[] {
    for (let i = 0; i < nodeList.length; i++) {
      const node = nodeList[i];
      if (node.id === targetId) {
        if (pos === 'before') return [...nodeList.slice(0, i), toInsert, ...nodeList.slice(i)];
        if (pos === 'after')  return [...nodeList.slice(0, i + 1), toInsert, ...nodeList.slice(i + 1)];
        // inside
        return [
          ...nodeList.slice(0, i),
          { ...node, children: [...(node.children ?? []), toInsert] },
          ...nodeList.slice(i + 1),
        ];
      }
      if (node.children?.length) {
        const newChildren = insertAt(node.children, targetId, pos, toInsert);
        if (newChildren !== node.children) {
          return [...nodeList.slice(0, i), { ...node, children: newChildren }, ...nodeList.slice(i + 1)];
        }
      }
    }
    return nodeList;
  }

  function handleDragStart(event: DragEvent, nodeId: string) {
    dragId = nodeId;
    event.dataTransfer?.setData('text/plain', nodeId);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  function handleDragEnd() {
    dragId = null;
    dropTargetId = null;
  }

  function handleDragOver(event: DragEvent, nodeId: string, rowEl: HTMLElement) {
    if (!draggable || dragId === nodeId) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';

    const rect = rowEl.getBoundingClientRect();
    const y = event.clientY - rect.top;
    const pct = y / rect.height;

    dropTargetId = nodeId;
    dropPos = pct < 0.25 ? 'before' : pct > 0.75 ? 'after' : 'inside';
  }

  function handleDragLeave(event: DragEvent, rowEl: HTMLElement) {
    // Only clear if we're leaving to outside the row
    if (!rowEl.contains(event.relatedTarget as Node | null)) {
      dropTargetId = null;
    }
  }

  function handleDrop(event: DragEvent, targetId: string) {
    event.preventDefault();
    if (!dragId || dragId === targetId) { dragId = null; dropTargetId = null; return; }

    const [dragged, nodesWithoutDragged] = findAndRemove([...nodes], dragId);
    if (!dragged) { dragId = null; dropTargetId = null; return; }

    const updated = insertAt(nodesWithoutDragged, targetId, dropPos, dragged);
    onDrop?.(updated);
    dragId = null;
    dropTargetId = null;
  }

  // Auto-expand nodes that match search (uses untrack to avoid loop when writing expanded)
  $effect(() => {
    if (searchQuery) {
      const currentExpanded = untrack(() => new Set(expanded));
      function expandMatching(nodeList: TreeNode[]) {
        for (const node of nodeList) {
          if (node.children && node.children.some(c => matchesSearch(c))) {
            currentExpanded.add(node.id);
            expandMatching(node.children);
          }
        }
      }
      expandMatching(nodes);
      untrack(() => {
        expanded = currentExpanded;
      });
    }
  });
</script>

<ul
  class="mljr-tree {compact ? 'mljr-tree-compact' : ''} {lines ? 'mljr-tree-line' : ''} {className}"
  role="tree"
  aria-multiselectable={multiple || checkable}
>
  {#each nodes as node}
    {#if isVisible(node)}
      {@render treeNode(node, 0)}
    {/if}
  {/each}
</ul>

{#snippet treeNode(node: TreeNode, depth: number)}
  {@const hasChildren = !!node.children?.length}
  {@const isExpanded = expanded.has(node.id)}
  {@const isSelected = selected.includes(node.id)}
  {@const checkState = checkable ? getCheckState(node) : null}

  {@const isDragging = draggable && dragId === node.id}
  {@const isDropTarget = draggable && dropTargetId === node.id}

  <li
    class="mljr-tree-node {isDragging ? 'mljr-tree-node-dragging' : ''} {isDropTarget ? `mljr-tree-node-drop-${dropPos}` : ''}"
    role="treeitem"
    aria-expanded={hasChildren ? isExpanded : undefined}
    aria-selected={isSelected}
  >
    <!-- Node Row -->
    <div
      class="mljr-tree-node-row"
      class:mljr-tree-node-row-selected={isSelected && !checkable}
      class:mljr-tree-node-row-disabled={node.disabled}
      draggable={draggable && !node.disabled ? 'true' : undefined}
      onclick={() => selectNode(node)}
      ondragstart={(e) => handleDragStart(e, node.id)}
      ondragend={handleDragEnd}
      ondragover={(e) => handleDragOver(e, node.id, e.currentTarget as HTMLElement)}
      ondragleave={(e) => handleDragLeave(e, e.currentTarget as HTMLElement)}
      ondrop={(e) => handleDrop(e, node.id)}
      role="presentation"
    >
      <!-- Toggle button -->
      {#if hasChildren}
        <button
          type="button"
          class="mljr-tree-toggle"
          class:mljr-tree-toggle-open={isExpanded}
          onclick={(e) => { e.stopPropagation(); toggleExpand(node.id); }}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      {:else}
        <span class="mljr-tree-spacer"></span>
      {/if}

      <!-- Checkbox -->
      {#if checkable}
        <input
          type="checkbox"
          class="mljr-tree-checkbox"
          checked={checkState === 'checked'}
          indeterminate={checkState === 'indeterminate'}
          disabled={node.disabled}
          onclick={(e) => e.stopPropagation()}
          onchange={() => toggleCheck(node)}
          aria-label={node.label}
        />
      {/if}

      <!-- Icon -->
      {#if node.icon}
        <span class="mljr-tree-node-icon">
          <Icon icon={node.icon} size={16} />
        </span>
      {:else if hasChildren}
        <span class="mljr-tree-node-icon">
          <Icon icon={isExpanded ? 'mdi:folder-open' : 'mdi:folder'} size={16} />
        </span>
      {:else}
        <span class="mljr-tree-node-icon">
          <Icon icon="mdi:file-outline" size={16} />
        </span>
      {/if}

      <!-- Label -->
      {#if nodeContent}
        {@render nodeContent(node)}
      {:else}
        <span class="mljr-tree-node-label">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html highlightText(node.label)}
        </span>
      {/if}

      <!-- Children count -->
      {#if hasChildren}
        <span class="mljr-tree-node-count">{node.children!.length}</span>
      {/if}
    </div>

    <!-- Children -->
    {#if hasChildren && isExpanded}
      <ul class="mljr-tree-children" role="group">
        {#each node.children! as child}
          {#if isVisible(child)}
            {@render treeNode(child, depth + 1)}
          {/if}
        {/each}
      </ul>
    {/if}
  </li>
{/snippet}
