const data = [
    {
        id: 23,
        name: "Leo Gill",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        reportees: [20, 31]
    },
    {
        id: 20,
        name: "Miyah Myles",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        reportees: [62]
    },
    {
        id: 31,
        name: "Zachary Levi",
        image: "https://randomuser.me/api/portraits/men/97.jpg",
        reportees: null
    },
    {
        id: 62,
        name: "Britney Cooper",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        reportees: [92]
    },
    {
        id: 92,
        name: "Lilja Peltola",
        image: "https://randomuser.me/api/portraits/women/17.jpg",
        reportees: null
    }
];

var displayed = [];
var newData = [];
var idArr = data.map(x => x["id"]);

const updateData = (el, dist) => {
    if (!displayed.includes(el["id"])) {
        el["dist"] = dist;
        newData.push(el);
        displayed.push(el["id"]);
        if (el["reportees"] != null) {
            var count = 0;
            el["reportees"].forEach(reportee => {
                var element = data[idArr.indexOf(reportee)];
                updateData(element, dist + 1);
            });
        }
    }
};

data.forEach(el => {
    updateData(el, 0);
});

const dispLitem = el => {
    var litem = document.createElement("div");
    litem.classList.add("litem");
    var nameNode = document.createTextNode(el["name"]);
    var lef = document.createElement("div");
    lef.classList.add("lef");
    var picon = document.createElement("img");
    picon.classList.add("picon");
    picon.setAttribute("src", el["image"]);
    lef.appendChild(picon);
    var nam = document.createElement("div");
    nam.classList.add("name");
    nam.appendChild(nameNode);
    lef.appendChild(nam);
    litem.appendChild(lef);

    var righ = document.createElement("div");
    righ.classList.add("righ");

    if (el["count"]) {
        var count = document.createElement("div");
        count.classList.add("count");
        count.appendChild(document.createTextNode(el["count"]));
        righ.appendChild(count);
    }
    litem.appendChild(righ);
    litem.style.marginLeft = el["dist"] * 20 + "px";
    return litem;
};

newData.forEach((el, ind) => {
    var count = 0;
    for (i = ind + 1; i < newData.length; i++, count++) {
        if (newData[i]["dist"] <= el["dist"]) {
            break;
        }
    }
    el["count"] = count;

    document.getElementsByTagName("body")[0].appendChild(dispLitem(el));
});
