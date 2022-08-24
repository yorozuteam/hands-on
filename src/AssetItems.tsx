import React,{ useState, useEffect } from 'react';
import {
    MenuItem,
    Select,
    FormControl,
    InputLabel,
  } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import Button from '@mui/material/Button';


const AssetItems = () =>{
  // Grid周りのデータを用意
  const rows: GridRowsProp = [
    { id: 1, name: 'ボロボロのノートパソコン', gaiyo:'壊れかけ', user: '使ってる人', kubun:'left'},
    { id: 2, name: 'ノートパソコン', gaiyo:'ふつう', user: '所持者とか', kubun:'left'},
    { id: 3, name: 'すごいノートパソコン', gaiyo:'すごい', user: '所持者とか', kubun:'left'},
  ]
  const cols: GridColDef[] = [
    {
      field: 'name',
      headerName: '使用なし',
      width: 200

    },
    {
      field: 'gaiyo',
      headerName: '概要'
    },
    {
      field: 'user',
      headerName: '使用者とか'
    }
  ]
  const rows2: GridRowsProp = [
    { id: 1, name: 'ボロボロ', gaiyo:'壊れ', user: '使ってる', kubun:'right'},
    { id: 2, name: 'ノート', gaiyo:'う', user: '所持者', kubun:'right'},
    { id: 3, name: 'すごいノートン', gaiyo:'すご', user: '所持とか', kubun:'right'},
  ]
  const cols2: GridColDef[] = [
    {
      field: 'name',
      headerName: '使用中',
      width: 200
    },
    {
      field: 'gaiyo',
      headerName: '概要'
    },
    {
      field: 'user',
      headerName: '使用者とか'
    }
  ]

  // Gridを選択したときのデータ
  const [clickData, setClickData] = useState<any>({
    id : 0,
    name : 'things',
    gaiyo : 'gaiyo',
    user : 'user'
  })

  const [rowsData, setRowData] = useState<any>(rows)
  const [rowsData2, setRowData2] = useState<any>(rows2)

  const addValue = () => {
  }
  return (
    <>
      <h1>すごい固定資産</h1>
      <div id="flexbox">
        <div>
          <div style={{ width: '100%', height: 300 }}>
            <DataGrid 
              columns={cols}
              rows={rowsData}
              /* Gridの要素をクリックしたとき */
              onRowClick={(params:any)=>{
                console.log(params)
                setClickData(params.row)
              }}
            />
          </div>
        </div>
        <div>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={()=>{
              console.log('ボタン押された')
              console.log(clickData)
              // 選択されたGridがどちらのものか確認して移動先/移動元を変える
              if (clickData.kubun == 'left'){
                // 配列内のオブジェクトidの最大値を求めて+1
                const id = Math.max(...rowsData2.map((v:any) => v.id)) + 1
                let tmpId = clickData.id
                clickData.id = id
                setRowData2([...rowsData2,clickData]);

                // 移動元になるデータ行を削除する
                const newRows = rowsData.filter((v:any) => clickData.id !=v.id);
                setRowData(newRows);
              }
              if (clickData.kubun == 'right'){
                // 配列内のオブジェクトidの最大値を求めて+1
                const id = Math.max(...rowsData.map((v:any) => v.id)) + 1
                let tmpId = clickData.id
                clickData.id = id
                setRowData([...rowsData,clickData]);

                // 移動元になるデータ行を削除する
                const newRows = rowsData2.filter((v:any) => clickData.id != v.id);
                setRowData2(newRows);
              }
            }}
          >
            ⇆
          </Button>
        </div>
        <div>
          <div style={{ width: '100%', height: 300 }}>
            <DataGrid
              columns={cols2}
              rows={rowsData2}
              onRowClick={(params:any)=>{
                console.log(params)
                setClickData(params.row)
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default AssetItems