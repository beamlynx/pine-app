import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { SuggestedNodeData } from '../model';
import { useTheme } from '../store/theme-context';

const handleStyle: React.CSSProperties = {
  width: '2px',
  height: '2px',
  background: 'darkgray',
  borderRadius: '50%',
};

type PineNodeProps = NodeProps<SuggestedNodeData>;

const SuggestedNodeComponent: React.FC<PineNodeProps> = ({ data }) => {
  const { isDarkMode } = useTheme();
  const candidate = data.type === 'candidate';
  const background = candidate
    ? isDarkMode
      ? '#cc7a00'
      : '#ff9800'
    : isDarkMode
      ? '#333333'
      : '#f5f5f5';
  const border = `2px dashed ${isDarkMode ? 'orange' : '#666'}`;

  return (
    <div
      style={{
        position: 'relative',
        padding: '12px 10px',
        border,
        background,
        borderRadius: '5px',
        color: isDarkMode ? '#ffffff' : 'inherit',
      }}
    >
      <div>{data.table}</div>
      {data.schema && data.schema !== 'public' && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: -5,
            padding: '2px 5px',
            fontSize: '8px',
            background: data.color ?? '#f5f5f5',
            color: isDarkMode ? '#1e1e1e' : 'inherit',
            borderRadius: '5px',
            transform: 'translateY(-100%)',
            boxShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.5)' : '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {data.schema}
        </div>
      )}
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <Handle type="source" position={Position.Right} style={handleStyle} />
    </div>
  );
};

export default SuggestedNodeComponent;
