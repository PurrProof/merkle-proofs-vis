import React from 'react';
import useStore from "../../store/store";

interface TreeNodeProps {
    nodeId: string;
    index: number;
    nodeValue: string;
    nodeHash: string;
    valueIndex: number | null;
}

const TreeNode = ({ nodeId, index, nodeValue, nodeHash, valueIndex }: TreeNodeProps) => {

    const { onLeafClick, selectedLeaves } = useStore(
        (state) => ({
            onLeafClick: state.onLeafClick,
            selectedLeaves: state.selectedLeaves,
        })
    );

    const selected = valueIndex && selectedLeaves.includes(valueIndex) ? " selected" : "";
    const isLeaf = valueIndex !== null;

    return (
        <div
            id={nodeId}
            className={(isLeaf ? "tree-node leaf" : "tree-node internal") + selected}
            onClick={isLeaf ? () => { onLeafClick(valueIndex) } : undefined}
        >
            {isLeaf ? <span className="value">{nodeValue}</span> : index === 0 ? "root node" : "internal node"}
            <div className="info">
                <span className="index">#{index}: </span>
                <span className="hash">{nodeHash}</span>
            </div>
        </div>
    )
};

export default React.memo(TreeNode);
