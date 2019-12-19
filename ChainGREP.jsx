//DESCRIPTION:Create FindChange Skripts based on saved Queries
/* 
Version:	1.11
ChainGREP.jsx is licensed GNU GENERAL PUBLIC LICENSE Version 3
Last-Change:	2019-12-19
Author: Gregor Fellenz http://publishingx.de

Thanks to Peter Kahrel http://www.kahrel.plus.com for valuable inspiration!

Example of an fcQueryObject = {name: "", type:"GREP", findWhat:"", changeTo:"", findPStyle:"", findCStyle:"", changePStyle:"", changeCStyle:""}
*/

/* If you add further translations, please send your uiStrings object to Gregor Fellenz http://publishingx.de
	If you feel uncertain how to add translation string, simply send the strings.
*/
// Japanese Translations by Yu https://twitter.com/Yo_Yu_You
// French Translation by Marc Autret http://www.indiscripts.com/
// Dutch Translation by Mathijs Altena https://www.alt-a.nl/
var uiStrings = {
	versionError: {
		en: "This script runs only in InDesign CS4 or higher",
		de: "Für dieses Skript wird mindestens InDesign CS4 benötigt",
		fr: "Ce script requiert InDesign CS4 ou supérieur",
		ja_JP: "このスクリプトはinDesignCS4以上で動作します",
        nl: "Dit script werkt alleen met InDesign CS4 of hoger"
	},
	writeError: {
		en: "Cannot write at [%1] Check permissions!",
		de: "Keine Schreibberechtigung im Ordner [%1]!",
		fr: "Impossible d'écrire dans [%1]. Vérifiez les permissions système !",
		ja_JP: "以下のフォルダへ書き込みができませんでした\n\n[%1]\n\n上記フォルダへ書き込みが可能か確認してみてください",
        nl: "Kan niet wegschrijven in [%1], check schrijvrechten"
	},
	couldNotRead: {
		en: "Could not read Query-Files in Folder\n [%1]",
		de: "Konnte die Abfragen-Datei nicht im Ordner [%1] finden",
		fr: "Impossible de lire les fichiers de requêtes dans le dossier\n [%1]",
		ja_JP: "以下のフォルダ内からクエリを読み込めませんでした\n\n[%1]\n\nクエリをまだ作成していない場合はクエリを作成後\n再度スクリプトを実行してみてください",
        nl: "Kan de zoekopdrachten in [%1] niet lezen"
	},
	windowTitle: {
		en: "Save GREP Queries",
		de: "GREP Abfragen speichern",
		fr: "Sauvegarde des requêtes GREP",
		ja_JP: "GREPクエリを保存",
        nl: "Bewaar GREPzoekopdrachten"
	},
	helpTip: {
		en: "Usage: \n1. Remove all unnecessary queries from list.\n2. Create the order with the Up and Down Button! \n3. If your happy with your Find/Change List click on Save and a script with your queries is written!",
		de: "Verwendung: \n1. Lösche alle Abfragen nicht benötigten Abfragen. \n2. Lege die Reihenfolge mit den Hoch und Runter Buttons fest. \n3. Wenn die Liste gut aussieht, wähle Speichern und ein neues Skript mit deinen Abfragen wird generiert!",
		fr: "Utilisation: \n1. Supprimez de la liste les requêtes superflues.\n2. Ordonnez les requêtes avec les boutons Haut et Bas.\n3. Lorsque la liste est prête, cliquez sur Sauvegarder pour générer le script correspondant.",
		ja_JP: "使用方法：\n1. リストから不要なクエリをすべて削除します。\n2. 上ボタンと下ボタンで実行する順番を決めます。\n3. スクリプトの名前を付け保存をクリックするとスクリプトが完成します！\n\n※ファイル名を入力後、テキストボックスからフォーカスを外すことで保存ボタンが押せるようになります。\n\n※スクリプトは「FindChangeScripts」フォルダに作成されます。一度InDesignのスクリプトパネルを消すか最小化することで作成したスクリプトが表示されます。",
        nl: "Werkwijze: \n1. Verwijder alle onnodige zoekopdrachten uit de lijst.\n2. Zet de zoekopdrachten in de juiste volgorde mbv de Up en Down-button! \n3. Ben je klaar, klik dan op Bewaar om het je script te bewaren!"
	},
	panelQueryList: {
		en: "Create an ordered list of queries",
		de: "Sortiere die Abfragen in der Liste",
		fr: "Création d'une liste ordonnée de requêtes",
		ja_JP: "クエリを実行する順番を決めてください",
        nl: "Maak een lijst van zoekopdrachten"
	},
	buttonUp: {
		en: "Up",
		de: "Nach oben",
		fr: "Haut",
		ja_JP: "上に移動",
        nl: "Naar boven"
	},
	buttonDown: {
		en: "Down",
		de: "Nach unten",
		fr: "Bas",
		ja_JP: "下に移動",
        nl: "Naar beneden"
	},
	buttonRm: {
		en: "Remove from List",
		de: "Entfernen",
		fr: "Supprimer de la liste",
		ja_JP: "削除",
        nl: "Verwijder van de lijst"
	},
	fcScope: {
		en: "Scope of Find/Change",
		de: "Bereich der Ersetzung",
		fr: "Portée de Rechercher/Remplacer",
		ja_JP: "検索置換の範囲",
        nl: "Zoeken in"
	},
	document: {
		en: "Document",
		de: "Dokument",
		fr: "Document",
		ja_JP: "ドキュメント",
        nl: "Document"
	},
	selection: {
		en: "Selection",
		de: "Auswahl",
		fr: "Sélection",
		ja_JP: "選択範囲",
        nl: "Selectie"
	},
	story: {
		en: "Story (of Selection)",
		de: "Textabschnitt",
		fr: "Article (contenant la sélection)",
		ja_JP: "ストーリー",
        nl: "Artikel (van selectie)"
	},
	userSelect: {
		en: "User select",
		de: "Benutzerauswahl",
		fr: "Sélection de l'utilisateur",
		ja_JP: "実行時に選択",
        nl: "Selectie van gebruiker"
	},
	scriptName: {
		en: "Script Name",
		de: "Name des Skripts",
		fr: "Nom du script",
		ja_JP: "スクリプト名",
        nl: "Scriptnaam"
	},
	cancel: {
		en: "Cancel",
		de: "Abbrechen",
		fr: "Annuler",
		ja_JP: "キャンセル",
        nl: "Annuleren"
	},
	saveList: {
		en: "Save List",
		de: "Liste speichern",
		fr: "Sauvegarder la liste",
		ja_JP: "保存",
        nl: "Bewaar lijst/script"
	},
	run: {
		en: "Run",
		de: "Starten",
		fr: "Démarrer",
		ja_JP: "実行",
        nl: "Start"
	},
	overwrite: {
		en: "File exists, overwrite?",
		de: "Datei überschreiben?",
		fr: "Le fichier existe déjà. Écraser ?",
		ja_JP: "同名のファイルが存在します。上書きしますか？",
        nl: "Bestand bestaat al, overschrijven?"
	},
	scriptFolder: {
		en: "Script Folder",
		de: "Skriptordner",
		fr: "Dossier de script",
		ja_JP: "スクリプトフォルダ",
        nl: "Scriptmap"
	},
	missingFindCS: {
		en: "Missing find characterstyle [%1] for query [%2]",
		de: "Fehlendes Such-Zeichenformat [%1] bei Abfrage [%2]",
		fr: "La requête [%2] invoque en recherche un style de caractère manquant : [%1]",
		ja_JP: "クエリ[%2]の検索形式に設定された文字スタイル[%1]が見つかりませんでした",
        nl: "Gezochte tekenstijl [%1] mist voor zoekopdracht [%2]"
	},
	missingFindPS: {
		en: "Missing find pagraphstyle [%1] for query [%2]",
		de: "Fehlendes Such-Absatzsformat [%1] bei Abfrage [%2]",
		fr: "La requête [%2] invoque en recherche un style de paragraphe manquant : [%1]",
		ja_JP: "クエリ[%2]の検索形式に設定された段落スタイル[%1]が見つかりませんでした",
        nl: "Gezochte alineastijl [%1] mist voor zoekopdracht [%2]"
	},
	missingChangeCS: {
		en: "Missing change characterstyle [%1] for query [%2]",
		de: "Fehlendes Ersetze-Zeichenformat [%1] bei Abfrage [%2]",
		fr: "La requête [%2] invoque en remplacement un style de caractère manquant : [%1]",
		ja_JP: "クエリ[%2]の置換形式に設定された文字スタイル[%1]が見つかりませんでした",
        nl: "Vervangende tekenstijl [%1] mist voor zoekopdracht [%2]"
	},
	missingChangePS: {
		en: "Missing change pagraphstyle [%1] for query [%2]",
		de: "Fehlendes Ersetze-Absatzsformat [%1] bei Abfrage [%2]",
		fr: "La requête [%2] invoque en remplacement un style de paragraphe manquant : [%1]",
		ja_JP: "クエリ[%2]の置換形式に設定された段落スタイル[%1]が見つかりませんでした",
        nl: "Vervangende alineastijl [%1] mist voor zoekopdracht [%2]"
	},
	couldNotLoadQuery: {
		en: "Could not load Query [%1] Error: ",
		de: "Die Abfrage [%1] konnte nicht geladen werden. Fehler: ",
		fr: "Could not load Query [%1] Error: ",
		ja_JP: "Could not load Query [%1] Error: ",
        nl: "Zoekopdracht [%1] kan niet worden geladen. Fout: "
	}
}


main();

function main() {
	// We need Version CS3 or higher 
	if (getVersion() < 6) {
		alert(localize(uiStrings.versionError));
		return;
	}
	// Can we write scripts to disk?
	var folder = Folder(getScriptFolderPath().toString() + "/FindChangeScripts");
	if (!folder.exists) {
		if (!folder.create()) {
			alert(localize(uiStrings.writeError, folder));
			return;
		}
	}
	var testFile = File(folder + "/test");
	if (!testFile.open("w")) {
		alert(localize(uiStrings.writeError, folder));
		return;
	}
	testFile.close();
	testFile.remove();

	var fcQueryArray = parseQueries("GREP");
	var fcObject = getQueryListUI(fcQueryArray);
	if (fcObject) saveQueryToScript(fcObject);
}

// Read folder with user queries 
function parseQueries(folderType) {
	var fcQueryArray = [];
	var fcFolder;
	var platfrom = File.fs;
	// User Files 
	if (platfrom == "Macintosh") {
		fcFolder = File(app.scriptPreferences.scriptsFolder.parent.parent + "/Find-Change Queries/" + folderType);
	} else {
		fcFolder = Folder(app.scriptPreferences.scriptsFolder.parent.parent + "/Find-Change Queries/" + folderType);
	}
	fcQueryArray = readFolder(fcFolder, fcQueryArray);

	// Program Files 
	if (platfrom == "Macintosh") {
		fcFolder = File(Folder.appPackage.parent + "/Presets/Find-Change Queries/" + folderType + "/" + $.locale);
	} else {
		fcFolder = File(Folder.appPackage + "/Presets/Find-Change Queries/" + folderType + "/" + $.locale);
	}
	fcQueryArray = readFolder(fcFolder, fcQueryArray);
	return fcQueryArray;
}
// Returns correct InDesign version number for folder name
function getVersion() {
	var version = parseFloat(app.version).toFixed(1);
	var versionString = (version % 1 == .5) ? version : Math.floor(version).toFixed(1);

	if ($.locale.indexOf("ja_JP") > -1) {
		versionString += "-J";
	}
	return versionString;
}
// Scans a folder for find change queries
function readFolder(fcFolder, fcQueryArray) {
	if (fcFolder.exists) {
		var files = fcFolder.getFiles("*.xml");
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			file.encoding = "UTF-8";
			file.open("r");
			try {
				searchXML = XML(file.read());
			}
			catch (e) {
				alert("Could not read XML File [" + decodeURI(file) + "]. If it's not a FindChange Query, remove it from the folder!");
				file.parent.execute();
				continue;
			}
			file.close();
			findWhat = String(searchXML.xpath("/Query/Description/FindExpression/@value"));
			changeTo = String(searchXML.xpath("/Query/Description/ReplaceExpression/@value"));

			findPStyle = String(searchXML.xpath("/Query/Description/FindFormatSettings/TextAttribute[@type='pstyle']/@value"));
			findCStyle = String(searchXML.xpath("/Query/Description/FindFormatSettings/TextAttribute[@type='cstyle']/@value"));
			changePStyle = String(searchXML.xpath("/Query/Description/ReplaceFormatSettings/TextAttribute[@type='pstyle']/@value"));
			changeCStyle = String(searchXML.xpath("/Query/Description/ReplaceFormatSettings/TextAttribute[@type='cstyle']/@value"));

			var fcQueryObject = { name: file.displayName.replace(/\.xml$/, ""), type: "GREP", findWhat: findWhat, changeTo: changeTo, findPStyle: findPStyle, findCStyle: findCStyle, changePStyle: changePStyle, changeCStyle: changeCStyle };
			fcQueryArray.push(fcQueryObject);
		}
	} else {
		alert(localize(uiStrings.couldNotRead, decodeURI(fcFolder)));
	}
	return fcQueryArray;
}

// UI for building the chain
function getQueryListUI(fcQueryArray) {
	var w = new Window("dialog", localize(uiStrings.windowTitle), undefined, /*{resizeable: true}*/);
	w.orientation = "column";
	w.helpTip = localize(uiStrings.helpTip);

	lbPanel = w.add("Panel", undefined, localize(uiStrings.panelQueryList));
	lbPanel.alignment = ["fill", "fill"];
	lbPanel.margins = [10, 20, 10, 10];

	var list = lbPanel.add("listbox", undefined, undefined, { numberOfColumns: 4, showHeaders: true, columnTitles: ["Finc/Change Query", "Type", "Find", "Change"], multiselect: true, columnWidths: [350, 50, 100, 100] });
	list.alignment = ["fill", "fill"];
	list.preferredSize.height = 350;
	list.preferredSize.width = 420;

	fcQueryArray.sort(function(a, b){
		if(a.name.toUpperCase() < b.name.toUpperCase()) { return -1; }
		if(a.name.toUpperCase() > b.name.toUpperCase()) { return 1; }
		return 0;
	})

	for (var i = 0; i < fcQueryArray.length - 1; i++) {
		var lItem = list.add("item", fcQueryArray[i].name);
		lItem.fcQuery = fcQueryArray[i];
		lItem.helpTip = "Find: " + fcQueryArray[i].findWhat + "\rChange: " + fcQueryArray[i].changeTo;
		lItem.subItems[0].text = fcQueryArray[i].type;
		lItem.subItems[1].text = fcQueryArray[i].findWhat;
		lItem.subItems[2].text = fcQueryArray[i].changeTo;
	}

	var ctrlGroup = lbPanel.add("group");
	ctrlGroup.orientation = "row";
	ctrlGroup.alignment = ["center", "top"];
	with (ctrlGroup) {
		var upBtn = ctrlGroup.add("button", undefined, localize(uiStrings.buttonUp));
		var downBtn = ctrlGroup.add("button", undefined, localize(uiStrings.buttonDown));
		ctrlGroup.add("StaticText", undefined, "|");
		var removeBtn = ctrlGroup.add("button", undefined, localize(uiStrings.buttonRm));
	}
	upBtn.onClick = function () {
		if (list.selection == null) {
			return;
		}
		fixSelection(list.selection);
		var first = list.selection[0].index;
		if (first == 0 || !continuous(list.selection)) return;
		var last = first + list.selection.length;
		for (var i = first; i < last; i++) {
			swap(list.items[i - 1], list.items[i]);
		}
		list.selection = null;
		for (var i = first - 1; i < last - 1; i++) {
			list.selection = i;
		}
	}
	downBtn.onClick = function () {
		if (list.selection == null) {
			return;
		}
		fixSelection(list.selection);
		var last = list.selection[list.selection.length - 1].index;
		if (last == list.items.length - 1 || !continuous(list.selection)) return;
		var first = list.selection[0].index;
		for (var i = last; i >= first; i--) {
			swap(list.items[i + 1], list.items[i]);
		}
		list.selection = null;
		for (var i = first + 1; i <= last + 1; i++) {
			list.selection = i;
		}
	}

	removeBtn.onClick = function () {
		if (list.selection == null) {
			return;
		}
		var sel = list.selection[0].index;
		for (var i = list.selection.length - 1; i >= 0; i--) {
			list.remove(list.selection[i]);
		}
		if (sel > list.items.length - 1) {
			list.selection = null;
		}
		else {
			list.selection = sel;
		}
	}



	function continuous(sel) {
		return sel.length == (sel[sel.length - 1].index - sel[0].index + 1);
	}
	function swap(x, y) {
		var temp = {};
		temp.text = x.text;
		temp.fcQuery = x.fcQuery;
		temp.subItems0 = x.subItems[0].text;
		temp.subItems1 = x.subItems[1].text;
		temp.subItems2 = x.subItems[2].text;

		x.text = y.text;
		x.fcQuery = y.fcQuery;
		x.subItems[0].text = y.subItems[0].text;
		x.subItems[1].text = y.subItems[1].text;
		x.subItems[2].text = y.subItems[2].text;

		y.text = temp.text;
		y.fcQuery = temp.fcQuery;
		y.subItems[0].text = temp.subItems0
		y.subItems[1].text = temp.subItems1
		y.subItems[2].text = temp.subItems2
	}
	function fixSelection(sel) {
		if ((sel[sel.length - 1].index - sel[0].index + 1) <= 0) {
			// Need to reverse
			list.selection = null;
			for (var i = sel[sel.length - 1].index; i < sel[0].index + 1; i++) {
				list.selection = i;
			}
		}
	}

	var scopePanel = w.add("Panel", undefined, localize(uiStrings.fcScope));
	scopePanel.orientation = "row";
	scopePanel.alignment = "fill";
	scopePanel.margins = [10, 20, 10, 10];

	with (scopePanel) {
		rButScopeDoc = add("radiobutton", undefined, localize(uiStrings.document));
		rButScopeDoc.value = true;
		// rButScopeSel = add("radiobutton", undefined, localize(uiStrings.selection));
		rButScopeStory = add("radiobutton", undefined, localize(uiStrings.story));
		rButScopeUser = add("radiobutton", undefined, localize(uiStrings.userSelect));
	}

	var fileGroup = w.add("Panel", undefined, localize(uiStrings.scriptName));
	fileGroup.orientation = "row";
	fileGroup.alignment = "fill";
	fileGroup.margins = [10, 20, 10, 10];
	fileGroup.alignChildren = ["fill", "fill"];
	with (fileGroup) {
		fileGroup.sText = fileGroup.add("StaticText", undefined, localize(uiStrings.scriptFolder) + "/FindChangeScripts/");
		fileGroup.etScriptFile = fileGroup.add("EditText", undefined, "");
		fileGroup.etScriptFile.preferredSize.width = 200;
	}

	var uiCtrlGroup = w.add("group");
	uiCtrlGroup.orientation = "row";
	uiCtrlGroup.alignment = "fill";
	uiCtrlGroup.alignChildren = ["right", "top"];
	with (uiCtrlGroup) {
		var cancelBtn = uiCtrlGroup.add("button", undefined, localize(uiStrings.cancel));
		var okButton = uiCtrlGroup.add("button", undefined, localize(uiStrings.saveList));
		okButton.enabled = false;

		cancelBtn.onClick = function () {
			w.close(2);
		}
		okButton.onClick = function () {
			fcObject = {};
			fcObject.fcQueryArray = [];
			for (var i = 0; i < list.items.length; i++) {
				fcObject.fcQueryArray[i] = list.items[i].fcQuery;
			}
			if (rButScopeDoc.value) fcObject.scope = "doc";
			// else if (rButScopeSel.value) fcObject.scope = "selection";
			else if (rButScopeStory.value) fcObject.scope = "story";
			else if (rButScopeUser.value) fcObject.scope = "user";

			fcObject.exportFile = File(fileGroup.helpTip);

			//~ 			if (rButTypePortable.value) fcObject.scriptType = "portable";
			//~ 			else if (rButTypeQuery.value) fcObject.scriptType = "query";
			fcObject.scriptType = "portable";

			w.close(1);
		}
	}

	fileGroup.etScriptFile.onChange = function () {
		if (fileGroup.etScriptFile.text.length == 0) {
			okButton.enabled = false;
			return;
		}
		fileGroup.etScriptFile.text = fileGroup.etScriptFile.text.replace(/\.jsx$/, '') + ".jsx";
		var scriptFile = File(getScriptFolderPath().toString() + "/FindChangeScripts/" + fileGroup.etScriptFile.text);
		if (scriptFile.exists && !confirm(localize(uiStrings.overwrite))) {
			okButton.enabled = false;
			return;
		}

		fileGroup.helpTip = scriptFile.fullName;
		okButton.enabled = true;
	}

	w.center()
	var res = w.show();

	if (res == 1) {
		return fcObject;
	}
	else {
		return false;
	}
}

// Save the chain
function saveQueryToScript(fcObject) {
	var fcQueryArray = fcObject.fcQueryArray;
	if (fcQueryArray.length == 0) {
		return; // TODO Should not happen? 
	}
	var scope = fcObject.scope;
	var scriptType = fcObject.scriptType;
	var exportFile = fcObject.exportFile;

	var typ = "Grep";

	var scriptString = "//This script was auto generated by chainGREP.jsx\n//chainGREP.jsx is provided by Gregor Fellenz https://www.publishingx.de/\n//Download at https://www.publishingx.de/download/chain-grep\n\n";
	scriptString += "main();\n\n";
	scriptString += "function main() {\n";
	scriptString += "	if (app.layoutWindows.length == 0) return;\n";
	if (scope == "doc") {
		scriptString += "	var changeObject = app.documents[0];\n";
	}
	// else if (scope == "selection") {
	// 	scriptString += "	if (app.selection.length != 1 || !app.selection[0].hasOwnProperty('changeGrep')) {\n";
	// 	scriptString += "		alert('Please select only one textframe or text range!');\n";
	// 	scriptString += "		return;\n";
	// 	scriptString += "	}\n";
	// 	scriptString += "	var changeObject = app.selection[0];\n";
	// }
	else if (scope == "story") {
		scriptString += "	if (app.selection.length != 1 || !app.selection[0].hasOwnProperty('changeGrep')) {\n";
		scriptString += "		alert('Please select only one textframe or text range!');\n";
		scriptString += "		return;\n";
		scriptString += "	}\n";
		scriptString += "	var changeObject = app.selection[0].parentStory;\n";
	}
	else if (scope == "user") {
		scriptString += "	if (app.selection.length == 0) {\n";
		scriptString += "		var scope = app.documents[0];\n";
		scriptString += "	}\n";
		scriptString += "	else {\n";

		scriptString += "		var w = new Window ('dialog', localize(" + uiStrings.fcScope.toSource() + ") );\n";
		scriptString += "		var scopePanel = w.add ('Panel', undefined, localize(" + uiStrings.fcScope.toSource() + ") );\n";
		scriptString += "		scopePanel.alignment = 'fill';\n";
		scriptString += "		scopePanel.alignChildren = 'fill';\n";
		scriptString += "		scopePanel.margins = [10,20,10,10];\n";
		scriptString += "		with (scopePanel) {\n";
		scriptString += "			rButScopeDoc = add( 'radiobutton', undefined, localize(" + uiStrings.document.toSource() + ") );\n";
		scriptString += "			rButScopeDoc.value = true;\n";
		// scriptString += "			rButScopeSel= add( 'radiobutton', undefined, localize(" + uiStrings.selection.toSource() + ") );\n";
		scriptString += "			rButScopeStory= add( 'radiobutton', undefined, localize(" + uiStrings.story.toSource() + ") );\n";
		scriptString += "		}\n";

		scriptString += "		var uiCtrlGroup = w.add ('group');\n";
		scriptString += "		with (uiCtrlGroup) {\n";
		scriptString += "			var cancelBtn = uiCtrlGroup.add ('button', undefined, localize(" + uiStrings.cancel.toSource() + "));\n";
		scriptString += "			var okButton = uiCtrlGroup.add ('button', undefined, localize(" + uiStrings.run.toSource() + ") );\n";

		scriptString += "			cancelBtn.onClick = function () {\n";
		scriptString += "				w.close(2);\n";
		scriptString += "			}\n";
		scriptString += "			okButton.onClick = function () {\n";
		scriptString += "				if (rButScopeDoc.value) scope = app.documents[0];\n";
		// scriptString += "				else if (rButScopeSel.value) scope = app.selection[0];\n";
		scriptString += "				else if (rButScopeStory.value) scope = app.selection[0].parentStory;\n";
		scriptString += "				w.close(1);\n";
		scriptString += "			}\n";
		scriptString += "		}\n";
		scriptString += "		if(w.show() != 1) {\n";
		scriptString += "			return\n";
		scriptString += "		}\n";
		scriptString += "	}\n";
		scriptString += "	var changeObject = scope; \n";

	}
	scriptString += "	if (changeObject.hasOwnProperty('characters') && changeObject.characters.length == 0) return;\n";
	scriptString += "	var doc = app.documents[0];\n";
	scriptString += "	var style;\n";
	scriptString += "	var scriptVersion = app.scriptPreferences.version;\n";
	scriptString += "	app.scriptPreferences.version = " + app.scriptPreferences.version + ";\n";
	scriptString += "	var options = app.findChange" + typ + "Options.properties;\n";


	var styleString;
	if (scriptType == "portable") {
		for (var i = 0; i < fcQueryArray.length; i++) {
			fcQueryObject = fcQueryArray[i];
			// fcQueryObject = {name: "", type:"GREP", findWhat:"", changeTo:"", findPStyle:"", findCStyle:"", changePStyle:"", changeCStyle:""}
			fcQuery = fcQueryObject.name;
			try {
				app.loadFindChangeQuery(fcQuery, SearchModes.GREP_SEARCH);
			}
			catch (e) {
				alert(localize(uiStrings.couldNotLoadQuery, fcQuery) + "\n" + e);
			}

			scriptString += "	app.find" + typ + "Preferences = NothingEnum.NOTHING;\n";
			scriptString += "	app.change" + typ + "Preferences = NothingEnum.NOTHING;\n";

			scriptString += "	// Query [[" + fcQuery + "]] -- If you delete this comment you break the update function\n";
			scriptString += "	try {\n"

			// Generate Style Checker, Severe Erros can occure when Styles are not available!			
			scriptString += "		app.findChange" + typ + "Options.properties = " + createObject(app["findChange" + typ + "Options"]).toSource() + ";\n";
			scriptString += "		app.find" + typ + "Preferences.properties = " + createObject(app["find" + typ + "Preferences"]).toSource() + ";\n";
			if (fcQueryObject.findCStyle != "") {
				styleString = fcQueryObject.findCStyle.replace(/\\/g, "\\\\");
				scriptString += "		style = getStyleByString(doc, '" + styleString + "', 'characterStyles');\n";
				scriptString += "		if (!style.isValid) throw Error(localize(" + uiStrings.missingFindCS.toSource() + ", '" + styleString + "', '" + fcQuery + "') );\n";
				scriptString += "		app.find" + typ + "Preferences.appliedCharacterStyle =  style;\n";
			}
			if (fcQueryObject.findPStyle != "") {
				styleString = fcQueryObject.findPStyle.replace(/\\/g, "\\\\");
				scriptString += "		style = getStyleByString(doc, '" + styleString + "', 'paragraphStyles');\n";
				scriptString += "		if (!style.isValid) throw Error(localize(" + uiStrings.missingFindPS.toSource() + ", '" + styleString + "', '" + fcQuery + "') );\n";
				scriptString += "		app.find" + typ + "Preferences.appliedParagraphStyle =  style;\n";
			}

			scriptString += "		app.change" + typ + "Preferences.properties = " + createObject(app["change" + typ + "Preferences"]).toSource() + ";\n";
			if (fcQueryObject.changeCStyle != "") {
				styleString = fcQueryObject.changeCStyle.replace(/\\/g, "\\\\");
				scriptString += "		style = getStyleByString(doc, '" + styleString + "', 'characterStyles');\n";
				scriptString += "		if (!style.isValid) throw Error(localize(" + uiStrings.missingChangeCS.toSource() + ", '" + styleString + "', '" + fcQuery + "') );\n";
				scriptString += "		app.change" + typ + "Preferences.appliedCharacterStyle =  style;\n";
			}

			if (fcQueryObject.changePStyle != "") {
				styleString = fcQueryObject.changePStyle.replace(/\\/g, "\\\\");
				scriptString += "		style = getStyleByString(doc, '" + styleString + "', 'paragraphStyles');\n";
				scriptString += "		if (!style.isValid) throw Error(localize(" + uiStrings.missingChangePS.toSource() + ", '" + styleString + "', '" + fcQuery + "') );\n";
				scriptString += "		app.change" + typ + "Preferences.appliedParagraphStyle =  style;\n";
			}

			scriptString += "		changeObject.change" + typ + "();\n";
			scriptString += "	} catch (e) {alert(e + ' at line ' + e.line)}\n"
		}
	}
	//~ 	else if (scriptType == "query") {
	//~ 			scriptString += "	try {\n";
	//~ 			scriptString += "		var list = [";
	//~ 			for (var i = 0; i < fcQueryArray.length; i++) {
	//~ 				scriptString += "'" +fcQueryArray[i].text + "'";
	//~ 				if (i < fcQueryArray.length -1) scriptString += ",";
	//~ 			}
	//~ 			scriptString += "];\n";
	//~ 			scriptString += "		for (var i = 0; i < list.length; i++) {\n";
	//~ 			scriptString += "			app.loadFindChangeQuery(list[i], SearchModes.GREP_SEARCH);\n";
	//~ 			scriptString += "			app.documents[0].changeGrep();\n";
	//~ 			scriptString += "		} \n";
	//~ 			scriptString += "	} catch (e) {alert(e + ' at line ' + e.line)}\n"			
	//~ 	}

	scriptString += "	app.findChange" + typ + "Options.properties = options;\n";
	scriptString += "	app.find" + typ + "Preferences = NothingEnum.NOTHING;\n";
	scriptString += "	app.change" + typ + "Preferences = NothingEnum.NOTHING;\n";
	scriptString += "	app.scriptPreferences.version = scriptVersion;\n";
	scriptString += "};\n\n";

	scriptString += "function getStyleByString(docOrGroup, string, property) {\n";
	scriptString += "	if (string == '[No character style]') return docOrGroup[property][0];\n";
	scriptString += "	if (string == '[No paragraph style]') return docOrGroup[property][0];\n";
	scriptString += "	if (string == 'NormalParagraphStyle') return docOrGroup[property][1];\n";
	scriptString += "	stringResult = string.match (/^(.*?[^\\\\]):(.*)$/);\n";
	scriptString += "	var styleName = (stringResult) ? stringResult[1] : string;\n";
	scriptString += "	styleName = styleName.replace (/\\\\:/g, ':');\n";
	scriptString += "	remainingString = (stringResult) ? stringResult[2] : '';\n";
	scriptString += "	var newProperty = (stringResult) ? property.replace(/s$/, '') + 'Groups' : property;\n";
	scriptString += "	var styleOrGroup = docOrGroup[newProperty].itemByName(styleName);\n";
	scriptString += "	if (remainingString.length > 0 && styleOrGroup.isValid) styleOrGroup = getStyleByString (styleOrGroup, remainingString, property);\n";
	scriptString += "	return styleOrGroup;\n";
	scriptString += "};\n";

	app["find" + typ + "Preferences"] = NothingEnum.NOTHING;
	app["change" + typ + "Preferences"] = NothingEnum.NOTHING;

	// Speichern 
	writeTextFile(exportFile, scriptString);
}


// Recreate an object for savin with toSource();
function createObject(object) {
	if (object == null) return null;
	if (object == undefined) return undefined;
	if (object.hasOwnProperty("properties")) {
		object = object.properties;
		delete object.index;
		delete object.parent;
		delete object.appliedCharacterStyle;
		delete object.appliedParagraphStyle;
		for (var property in object) {
			// Delete Defaults 
			if (object[property] == NothingEnum.NOTHING || object[property] == "" || object[property] == null || object[property] == "text font family" || object[property] == ChangeConditionsModes.REPLACE_WITH) {
				delete object[property];
			}
			else {
				object[property] = createObject(object[property]);
				// Delete Empty Objects == Default
				if (object[property].toSource() == "({})") {
					delete object[property];
				}
			}
		}
	} else if (object.constructor.name == "Enumerator") {
		object = object.valueOf();
	}
	return object;
}

// Writes a text File
function writeTextFile(_file, _string) {
	if (_file.constructor.name == "String") {
		_file = new File(_file);
	}
	if (_file.constructor.name == "File") {
		try {
			_file.encoding = "UTF-8";
			_file.open("w");
			_file.write(_string);
			_file.close();
			return true;
		} catch (e) { return e }
	}
	else {
		return Error("This is not a File");
	}
}



/** Get Filepath from current script  */
/*Folder*/ function getScriptFolderPath() {
	var skriptPath;
	try {
		$.level = 0;
		skriptPath = app.activeScript.parent;
	}
	catch (e) {
		/* We're running from the ESTK*/
		$.level = 2;
		skriptPath = File(e.fileName).parent;
	}
	return skriptPath;
}