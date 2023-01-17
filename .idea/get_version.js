$.get("https://raw.githubusercontent.com/merept/JS_GPAC/main/version.txt", function(data) {
        $(".gpac-js").text(data)
})