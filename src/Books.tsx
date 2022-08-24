const generate_table = () => {
  // body の参照を取得
  var body = document.getElementsByTagName("body")[0];

  // <table> 要素と <tbody> 要素を作成
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // すべてのセルを作成
  for (var i = 0; i < 2; i++) {
    // 表の行を作成
    var row = document.createElement("tr");

    for (var j = 0; j < 2; j++) {
      // <td> 要素とテキストノードを作成し、テキストノードを
      // <td> の内容として、その <td> を表の行の末尾に追加
      var cell = document.createElement("td");
      var cellText = document.createTextNode(i+" 行目、 "+j+" 列目のセル");
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // 表の本体の末尾に行を追加
    tblBody.appendChild(row);
  }

  // <tbody> を <table> の中に追加
  tbl.appendChild(tblBody);
  // <table> を <body> の中に追加
  body.appendChild(tbl);
  // tbl の border 属性を 2 に設定
  tbl.setAttribute("border", "2");
} 


// MEMO これは決め打ちで一番上の表の要素を左から右の表に移動する処理
const get_table = () => {
  // データの移動元
  var table:any = document.getElementById("table1");
  console.log(table)
  var remCell = null
  var count = 0
  for (let row of table.rows) {
    console.log(row)
    if (count == 1){
      remCell = row.cells
    }
    for(let cell of row.cells){
       console.log(cell.innerText);
    }
    count++
  }
  // データの移動先
  var table2:any = document.getElementById("table2");
  console.log(table2)
  // データを追加する
  // 行を作成
  var row2 = document.createElement("tr")
  for(let cell of remCell){
    var mycell = document.createElement("td");
    // 移動元となる左の表から取り出した値を右の行の末尾に追加するためにデータを取り出す
    var cellText = document.createTextNode(cell.innerText);
    mycell.appendChild(cellText);
    row2.appendChild(mycell);
  }
  var tblBody = document.createElement("tbody");
  tblBody.appendChild(row2)
  table2.appendChild(tblBody)
  // 移動元になったデータを削除
  table.deleteRow(1)
}

// MEMO 選択した左の表の要素から右に移動する処理
const move_checked_row =() =>{
  if (g_clicked == null){ return }
  if (g_clicked == 1){
    move_row_from_left()
  }
  if (g_clicked == 2){
    move_row_from_right()
  }

  // indexを振り直す処理
  reset_table_index()
  
  // フラグを寝かせる
  g_clicked = null
}
const reset_table_index = () =>{
  var indexNumber = 0
  // 左のテーブルの要素
  var table1:any = document.getElementById("table1");
  for (let row of table1.rows) {
    if (indexNumber > 0){
      row.cells[0].innerText = indexNumber
    }
    indexNumber++
  }
  // 右のテーブルの要素
  var table2:any = document.getElementById("table2");
  indexNumber = 0
  for (let row2 of table2.rows) {
    if (indexNumber > 0){
      row2.cells[0].innerText = indexNumber
    }
    indexNumber++
  }

}
// 左から右に移動させる
const move_row_from_left = () =>{
  // 行を作成
  var row2 = document.createElement("tr")
  for(let cell of g_remCells){
    var mycell = document.createElement("td");
    // 移動元となる左の表から取り出した値を右の行の末尾に追加するためにデータを取り出す
    var cellText = document.createTextNode(cell.innerText);
    mycell.appendChild(cellText);
    row2.appendChild(mycell);
  }
  var tblBody = document.createElement("tbody");
  tblBody.appendChild(row2)
  // データの移動先
  var table2:any = document.getElementById("table2");
  table2.appendChild(tblBody)

  // 移動元になったデータを削除するために対象のIndex番号を取得
  var targetIndex = g_remCells[0].innerText
  // 移動元になったデータを削除
  var table:any = document.getElementById("table1");
  table.deleteRow(targetIndex)
}
// 右から左に移動させる
const move_row_from_right = () =>{
  // 行を作成
  var row = document.createElement("tr")
  for(let cell of g_remCells2){
    var mycell = document.createElement("td");
    // 移動元となる左の表から取り出した値を右の行の末尾に追加するためにデータを取り出す
    var cellText = document.createTextNode(cell.innerText);
    mycell.appendChild(cellText);
    row.appendChild(mycell);
  }
  var tblBody = document.createElement("tbody");
  tblBody.appendChild(row)
  // データの移動先
  var table1:any = document.getElementById("table1");
  table1.appendChild(tblBody)

  // 移動元になったデータを削除するために対象のIndex番号を取得
  var targetIndex = g_remCells2[0].innerText
  // 移動元になったデータを削除
  var table:any = document.getElementById("table2");
  table.deleteRow(targetIndex)

}

var g_remCells:any = null
var g_remCells2:any = null
var g_clicked:any = null
// クリックイベント設定
document.addEventListener('click', function (e) {
  // グローバル変数の初期化
  g_remCells = null
  g_remCells2 = null
  // MEMO g_clicked は別のところをクリックしたときに初期化されたくないからしない
  // クリックした要素
  var target = e.target
  // FUTURE クリックしたのがTableならその部分の背景色を変更するとか

  // 左のテーブルの要素
  var table:any = document.getElementById("table1");

  var remRow = null
  if (table == null){return}
  for (let row of table.rows) {
    for (let cell of row.cells){
      if (cell == target){
        console.log('左のテーブルの要素が押されたよ')
        remRow = row
        g_clicked = 1
        break
      }
    }
  }

  var table2:any = document.getElementById("table2");
  var remRow2 = null
  for (let row2 of table2.rows) {
    for (let cell2 of row2.cells){
      if (cell2 == target){
        console.log('右のテーブルの要素が押されたよ')
        remRow2 = row2
        g_clicked = 2
        break
      }
    }
  }
  // TableのIndex番号を取得する
  console.log('推された要素のindex番号は')
  // 左側の要素が押されている場合
  if (remRow != null && remRow2 == null){
    console.log(remRow.cells[0])
    g_remCells = remRow.cells

  }
  // 右側の要素が押されている場合
  if (remRow == null && remRow2 != null){
    console.log(remRow2.cells[0])
    g_remCells2 = remRow2.cells
  }

})

const Books = () =>{
  return (
    <>
      <h1>すごい図書だよ</h1>
      {/* JavascriptでGrid出すとかできる */}
      <input type="button" value="Generate a table." onClick={generate_table}></input>
      <div id="flexbox">
        <div>
          {/* HTMLでGrid */}
          <table id="table1" border={2}>
            <tr>
              <th>index</th>
              <th>本タイトル</th>
              <th>概要</th>
              <th>前に借りてた人</th>
            </tr>
            <tr>
              <td>1</td>
              <td>あたまがすごくなる本</td>
              <td>これを読めばあたまがすごくなる</td>
              <td>すごくない人</td>
            </tr>
            <tr>
              <td>2</td>
              <td>あたまがすごくなる本2</td>
              <td>これを読めばすごくなる</td>
              <td>すごい人</td>
            </tr>
          </table>
        </div>
        <div>
          {/* Gridの要素を取得してみる */}
          {/*<input type="button" value="⇆" onClick={get_table}></input>*/}
          <input type="button" value="⇆" onClick={move_checked_row}></input>
        </div>
        <div>
          <table id="table2" border={2}>
            <tr>
              <th>index</th>
              <th>借りてる本タイトル</th>
              <th>概要</th>
              <th>借りてる人</th>
            </tr>
            <tr>
              <td>1</td>
              <td>あたまとは何</td>
              <td>これを読めばあたまになる</td>
              <td>すごくない人</td>
            </tr>
            <tr>
              <td>2</td>
              <td>すごくなる本2</td>
              <td>すごくなる</td>
              <td>すごい人</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  )
}
export default Books