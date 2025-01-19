import React, { useEffect, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { SelectedNodeData } from '../model';
import { useTheme } from '../store/theme-context';

type PineNodeProps = NodeProps<SelectedNodeData>;

const TableNode = ({
  order,
  table,
  schema,
  color,
  alias,
}: {
  order: number;
  table: string;
  schema: string;
  color?: string | null;
  alias: string;
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        padding: '12px 10px 5px 10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {/* Node */}
      <div
        style={{
          position: 'relative',
          padding: '12px 10px 5px 10px',
          border: `4px solid ${isDarkMode ? 'lelele' : 'darkgray'}`,
          background: isDarkMode ? '#333333' : 'lightgray',
          borderRadius: '5px',
          color: isDarkMode ? '#ffffff' : '#000000',
        }}
      >
        {/* Table */}
        <div>
          {table}
          <div
            style={{
              textAlign: 'right',
              fontSize: '8px',
              fontFamily: 'Courier, monospace',
            }}
          >
            {alias}
          </div>
        </div>

        {/* Order */}
        {
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: 'translate(-50%, -50%)',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: isDarkMode ? '#b71c1c' : '#800000',
              color: '#ffffff',
              fontSize: '12px',
              boxShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.5)' : '0 2px 4px rgba(0,0,0,0.25)',
              fontWeight: 'bold',
            }}
          >
            {order}
          </div>
        }

        {/* Schema */}
        {schema && schema !== 'public' && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: -5,
              padding: '2px 5px',
              fontSize: '8px',
              borderRadius: '5px',
              transform: 'translateY(-100%)',
              boxShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.5)' : '0 2px 4px rgba(0,0,0,0.1)',
              background: color ?? (isDarkMode ? '#1e1e1e' : '#424242'),
              color: isDarkMode ? '#1e1e1e' : 'inherit',
            }}
          >
            {schema}
          </div>
        )}

        <Handle
          type="target"
          position={Position.Left}
          style={{
            width: '2px',
            height: '2px',
            background: isDarkMode ? '#999' : 'darkgray',
            borderRadius: '50%',
          }}
        />
        <Handle
          type="source"
          position={Position.Right}
          style={{
            width: '2px',
            height: '2px',
            background: isDarkMode ? '#999' : 'darkgray',
            borderRadius: '50%',
          }}
        />
      </div>
    </div>
  );
};

const SelectedColumns = ({ columns }: { columns: string[] }) => {
  const { isDarkMode } = useTheme();
  return (
    <div style={{ maxHeight: '500px', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          justifyContent: 'center',
        }}
      >
        {columns.map(column => (
          <div
            key={column}
            style={{
              fontSize: '8px',
              fontFamily: 'Courier, monospace',
              background: isDarkMode ? '#424242' : '#f0f0f0',
              padding: '2px 6px',
              borderRadius: '8px',
              border: `1px solid ${isDarkMode ? '#666' : '#ddd'}`,
              color: isDarkMode ? '#ffffff' : '#000000',
            }}
          >
            {column}
          </div>
        ))}
      </div>
    </div>
  );
};

const CandidateColumns = ({ columns }: { columns: string[] }) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      style={{
        maxHeight: columns.length > 0 ? '500px' : '0',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {columns.map(column => (
          <div
            key={column}
            style={{
              fontSize: '8px',
              fontFamily: 'Courier, monospace',
              background: 'transparent',
              padding: '2px 6px',
              borderRadius: '8px',
              border: `1px solid ${isDarkMode ? '#555' : '#ccc'}`,
              color: isDarkMode ? '#999' : '#666',
            }}
          >
            {column}
          </div>
        ))}
      </div>
    </div>
  );
};

const Columns = ({ columns, suggested }: { columns: string[]; suggested: string[] }) => {
  const selectedColumnsSet = new Set(columns);
  const candidateColumns = suggested.filter(col => !selectedColumnsSet.has(col));

  return (
    <div
      style={{
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <SelectedColumns columns={columns} />
      <CandidateColumns columns={candidateColumns} />
    </div>
  );
};

const SelectedNodeComponent: React.FC<PineNodeProps> = ({ data }) => {
  const { order, table, schema, color, alias, columns, suggestedColumns } = data;
  const showBorder = suggestedColumns.length > 0;
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        border: '1px solid',
        borderRadius: showBorder ? '8px' : '0',
        borderColor: showBorder ? (isDarkMode ? '#555' : '#ccc') : 'transparent',
        padding: '12px',
      }}
    >
      <TableNode order={order} table={table} schema={schema} color={color} alias={alias} />
      <Columns columns={columns} suggested={suggestedColumns} />
    </div>
  );
};

export default SelectedNodeComponent;
