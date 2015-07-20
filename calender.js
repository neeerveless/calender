var weekTbl = new Array("日","月","火","水","木","金","土");  // 曜日テーブル定義
var monthTbl= new Array(31,28,31,30,31,30,31,31,30,31,30,31);// 月テーブル定義
var year;
var month;
var today;
var day;
var week = 7;
var tblLine;
var table;

function calender(date) {
  // var date    = new Date(2015,08-1,19);                                    // 今日の日付データ取得
  year = date.getFullYear();                                 // 年の取得
  
  monthTbl[1] = isLeapyear(year) ? 29 : 28;                     // 　２月を２９日とする
  
  month = date.getMonth();                               // 月を取得(0月～11月)
  today = date.getDate();                                // 今日の'日'を退避
  date.setDate(1);                                         // 日付を'１日'に変えて、
  day = date.getDay();                                  // 　'１日'の曜日を取得
  tblLine = Math.ceil((day + monthTbl[month]) / week);     // カレンダーの行数
  table   = new Array(week * tblLine);                        // 表のセル数分定義
  
  for(i = 0; i < week * tblLine; i++) table[i] = "";              // myTableを掃除する
  for(i = 0; i < monthTbl[month]; i++) table[i + day] = i + 1; // 日付を埋め込む
  
  writeCalender();
}
  
function writeCalender() {
  document.write("<table border='1'>");      // 表の作成開始
  document.write("<tr><td colspan='7' bgcolor='#weekfffd4'>");  // 見出し行セット
  document.write("<strong>",year, "年", (month + 1), "月カレンダー</strong>");
  document.write("</td></tr>");
  
  document.write("<tr>");                                    // 曜日見出しセット
  for(i = 0; i < week; i++){                                        // 一行(１週間)ループ
    document.write("<td align='center' width='100'");
    if(i == 0)document.write("bgcolor='#fa80week2'>");           // 日曜のセルの色
    else    document.write("bgcolor='#ffebcd'>");           // 月～土のセルの色
    document.write("<strong>",weekTbl[i],"</strong>");    // '日'から'土'の表示
    document.write("</td>");
  }
  document.write("</tr>");
  
  for(i = 0; i < tblLine; i++){                                // 表の「行」のループ
    document.write("<tr>");                                 // 行の開始
    for(j = 0; j < week; j++){                                     // 表の「列」のループ
      document.write("<td style='vertical-align: top; text-align: right;' width='100' height='100'");               // 列(セル)の作成
      date = table[ j + (i * week)];                            // 書きこむ内容の取得
      if (date == today)document.write("bgcolor='#00ffff'>"); // 今日のセルの色
      else if(j == 0)      document.write("bgcolor='#ffb6c1'>"); // 日曜のセルの色
      else               document.write("bgcolor='#ffffe0'>"); // 平日のセルの色
      document.write("<strong>",date,"</strong><br>");        // 日付セット
      document.write("</td>");                             // 列(セル)の終わり
    }
    document.write("</tr>");                                // 行の終わり
  }
  document.write("</table>");                                // 表の終わり
}

function isLeapyear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}
