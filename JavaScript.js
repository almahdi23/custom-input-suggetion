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
			var input = $("#text").val();

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
						var substrs = createsubstrs(item);
						for (var subst in substrs) {
							var subst = substrs[subst];
							if (subst != "") {
								if (input == subst) {
									if (a[a.length - 1] != item) {
										a.push(item);
									}
								}
							}
						}
					}
				}
				$("#ls").html(brek(a));
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
					var substrs = createsubstrs(item);
					for (var subst in substrs) {
						var subst = substrs[subst];
						if (subst != "") {
							if (input == subst) {
								if (a[a.length - 1] != item) {
									a.push(item);
								}
							}
						}
					}
				}
			}
			$("#ls").html(brek(a));
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

	function createsubstrs(item) {
		var len = item.length;
		var ar = [];
		var i = 0;
		while (i <= len) {
			var l = 0;
			while (l <= len) {
				if (i < l) {
					ar.push(item.slice(i, l));
				}
				l++;
			}
			i++;
		}
		ar.sort();
		return ar;
	}

	function brek(array) {
		var newarray = [];
		for (var l in array) {
			newarray.push("<div class='option'>" + array[l] + "</div>");
		}
		return newarray;
	}
});