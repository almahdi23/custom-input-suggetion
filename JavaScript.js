$(document).ready(function () {
	var ls = document.getElementById("ls");
	var items = ["apple", "mango", "banana", "cheries", "date", "how to install gta san andress", "web development tutorial"];
	items.sort();

	var where = -1;
	var out;

	document.getElementById("text").addEventListener("keydown", function (e) {
		setTimeout(function () {
			var key = e.keyCode;
			var ls = document.getElementById("ls");
			var input = $("#text").val().trim();

			if (key == 38 || key == 40) {
				var list = document.getElementsByClassName("option");
				if (list.length > 0) {
					if (key == 40) {
						$(list).removeClass("selected");
						if (where < list.length - 1) {
							where++;
							$(list[where]).addClass("selected");
							$("#text").val(list[where].innerHTML);
						} else if (where == list.length - 1) {
							where = -1;
							$("#text").val(out);
						}
					} else if (key == 38) {
						if (where == -1) {
							$("#text").val(out);
							where = list.length;
						}
						if (0 <= where) {
							$("#text").val(input);
							where--;
							$(list).removeClass("selected");
							$(list[where]).addClass("selected");
							if (where == -1) {
								$("#text").val(out);
							} else {
								$("#text").val(list[where].innerHTML);
							}
						}
					}
				}
			} else {
				out = input;
				var a = [];
				if (input != " ") {
					for (var l in items) {
						var item = items[l];
						if (item.match(input)) {
							a.push(item);
						}
					}
				}
				$("#ls").html(builditem(a));
				where = -1;
			}

			if (ls.innerHTML == "") {
				$(ls).addClass("disnone");
			} else {
				$(ls).removeClass("disnone");
			}
		}, 100);
	});

	document.addEventListener("click", function (e) {
		var tr = e.target;
		var ls = document.getElementById("ls");
		var wh = "out";
		if (tr.id == "text") {
			wh = "t";
		}
		if (tr.classList[0] == "option") {
			$("#text").val(tr.innerHTML);
			var input = $("#text").val();
			out = input;
			var a = [];
			if (input != " ") {
				for (var l in items) {
					var item = items[l];
					if (item.match(input)) {
						a.push(item);
					}
				}
			}
			$("#ls").html(builditem(a));
			where = -1;
		}

		if (wh == "out") {
			if (tr.classList[0] != "option") {
				$(ls).addClass("disnone");
			}
		} else {
			if (ls.innerHTML != "") {
				$(ls).removeClass("disnone");
			}
		}
	});

	function builditem(array) {
		var items = [];
		for (var l in array) {
			items.push("<div class='option'>" + array[l] + "</div>");
		}
		return items;
	}
});