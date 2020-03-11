/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTable } from 'react-table';
import { useColorMode } from '@chakra-ui/core';
import styled from '../lib/styled';

type ModeProps = {
  mode: string;
};

const Styles = styled('div')<ModeProps>`
  padding: 0.5rem;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid ${props => (props.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)')};
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.75rem;
      border-bottom: 1px solid ${props => (props.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)')};
      border-right: 1px solid ${props => (props.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)')};
      :last-child {
        border-right: 0;
      }
    }
  }
`;

type TableProps = {
  columns: any;
  data: any;
};

function SimpleTable({ columns, data }: TableProps) {
  const { colorMode } = useColorMode();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <Styles mode={colorMode}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
}

export default SimpleTable;
