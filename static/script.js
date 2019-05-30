$(document).ready(function() {

    // When click image, open image in a new window
    $(document.body).on("click", "img", [], function () {
        // window.location.href = this.src;
        window.open(this.src);
    });

    // Auto numbering of headings
    let indices = [];
    function addIndex() {
        // jQuery will give all the HNs in document order
        jQuery('h2,h3,h4,h5,h6').each(function() {
            let hIndex = parseInt(this.nodeName.substring(1)) - 2;

            // just found a levelUp event
            if (indices.length - 1 > hIndex) {
                indices= indices.slice(0, hIndex + 1 );
            }

            // just found a levelDown event
            if (indices[hIndex] === undefined) {
                indices[hIndex] = 0;
            }

            // count + 1 at current level
            indices[hIndex]++;

            // display the full position in the hierarchy
            jQuery(this).prepend("<span style='color: #ccc;'>" + indices.join(".") + ".&ensp;</span>");
        });
    }
    addIndex();

    // Auto generate table of content
    $(document.body).prepend('<div id="toc" style="overflow-y: auto; max-height: 600px"></div>');
    $("#toc").append('<p style="margin-left: 1em"><b>Table of Content</b></p>');
    $("h1, h2, h3, h4").each(function(i) {
        let current = $(this);
        current.attr("id", "title" + i);

        // $("#toc").append("<a id='link" + i + "' href='#title" + i + "' title='" + current.prop("tagName") + "'>" + current.html() + "</a>");
        // $("#toc").append("<a id='link" + i + "' href='#title" + i + "' title='" + current.prop("tagName") + "'>" + current.text() + "</a>");

        let content = document.createElement('h2');
        content.innerHTML = $(current).html();
        $(content).children('.cite').remove();

        if ($(current).hasClass("hk")) {
            $("#toc").append("<a id='link" + i + "' href='#title" + i + "' class='headingIsKeywords' title='" + current.prop("tagName") + "'>" + $(content).text() + "</a>");
        } else {
            $("#toc").append("<a id='link" + i + "' href='#title" + i + "' title='" + current.prop("tagName") + "'>" + $(content).text() + "</a>");
        }
    });
    $("#toc").append('<button id="btn-show-or-hide-all-refs">show/hide all refs</button>');

    // Reference(s) show and hide
    $("button").on("click", function() {
        if ($(this).next().hasClass("refs")) {
            let x = $(this).next();
            if (x.css("display") === "none") {
                x.css("display", "block");
            } else {
                x.css("display", "none");
            }
        }
    });

    let display = 1;
    $("#btn-show-or-hide-all-refs").on("click", function() {
        console.log(display);
        if (display === 1) {
            $(".refs").each(function () {
                $(this).css("display", "block");
            });
            display = 0;
        } else {
            $(".refs").each(function () {
                $(this).css("display", "none");
            });
            display = 1;
        }
    });

    // Open link in new tab
    function externalLinks() {
        for (let c = document.getElementsByTagName("a"), a = 0; a < c.length; a++) {
            let b = c[a];

            // all links open in new browser tag, except the link is the same hostname
            // b.getAttribute("href") && b.hostname !== location.hostname && (b.target = "_blank");

            // all links open in new browser tag, except the link is a bookmark
            b.getAttribute("href") && b.getAttribute("href").search(/#/i) !== 0 && (b.target = "_blank");
        }
    }
    externalLinks();
});
