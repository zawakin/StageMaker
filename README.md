# StageMaker
<h1>RBPのステージを作るJavaプログラム。</h1>

<h3>使い方：</h3>
１．git bashでStageMakerをコピーしたいフォルダに移動する。<br/>
２．<code>git clone https://github.com/zawawahoge/StageMaker.git</code> を実行し、クローンされたStageMakerフォルダに移動する。<br/>
３．使用したいバージョンのRBPフォルダをStageMakerフォルダ"内"に配置し、そのフォルダ名を"RBP"にする(こうしないとjsファイルが生成されない）。<br/>
４．Javaのコンパイルを<code>javac Main.java StageMaker.java</code>で実行する。コンパイルが成功すると、.classファイルが複数出てくる。<br/>
５．Javaの実行は、
<code>java Main MyStage Figure</code>で、成功すると白いウィンドウが立ち上がる。ステージを書いたらRBPフォルダ内に<code>MyStage.js</code>ができる。<br/>
６．このファイルを<code>index.html</code>でscriptとしてhead内に記述して、みたいな感じ。<br/>
<strong>
RBPのバージョン0.1のみ動作確認済み。
実はcloneしたフォルダではコンパイル済みで、<code>index.html</code>にscriptファイルとして登録してるので、上の１、２、５だけで行けるよ。
</strong>