import { Introduction } from './intro';
import { Navigation } from './navigate';

export const Documentation = (
  <div style={{ display: 'flex', margin: 10 }}>
    <div style={{ color: 'grey', textAlign: 'left', width: '50%' }}>{Introduction}</div>
    <div style={{ color: 'grey', textAlign: 'left', width: '50%' }}>{Navigation}</div>
  </div>
);
