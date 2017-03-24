$(function() {

    var body = $("body");

    $("input[name=phone]").inputmask({
        "mask": "+9 (999) 999-9999",
        greedy: false,
        "oncomplete": function(){
            $(this).removeClass("incomplete");
        },
        "onincomplete": function() {
            var self = $(this);

            if (!self.hasClass("incomplete")) {
                self.addClass("incomplete");
            }
        },
    });

    $(".js-form-city").on("submit", function(e) {

        if ($("input").hasClass("incomplete")) {
            e.preventDefault();

            $(".incomplete").eq(0).focus();
        }
    });


    //forms

    body.on("click", ".js-small-btn", function(e) {
        e.preventDefault();

        if (!$(".thanks").length) {
            body.addClass("form-open");
            $(".form-wrap_small").addClass("form-wrap_open");
        }
    });

    var name;

    $("#smallForm, #bottomForm").submit(function(e) {
        e.preventDefault();

        var self = $(this);
        var selfName = self.find("input[name=name]");
        var selfPhone = self.find("input[name=phone]");
        var selfPhone = self.find("input[name=email]");
        var formData = self.serialize();
        console.log(formData);

        $("[name=name1]").val(selfName.val());
        $("[name=phone1]").val(selfPhone.val());
        $("[name=email1]").val(selfPhone.val());

        $.ajax({
            type: "POST",
            url: "php/send.php",
            data: formData,
            success: function(data) {
                //location = "thanks.html";
            }
        });

        body.addClass("form-open");
        $(".form-wrap_big").addClass("form-wrap_open");

        name = selfName.val();

        if (name) {
            localStorage.setItem("centoflawname", name + ", ");
        } else {
            localStorage.setItem("centoflawname", "");
        }
    });

    // body.on("click", ".js-big-btn", function(e) {
    //     e.preventDefault();

    //     var self = $(this);
    //     var selfForm = self.closest("form");
    //     var selfName = selfForm.find("input[name=name]");

    //     body.addClass("form-open");
    //     $(".form-wrap_big").addClass("form-wrap_open");

    //     name = selfName.val();

    //     if (name) {
    //         localStorage.setItem("centoflawname", name + ", ");
    //     } else {
    //         localStorage.setItem("centoflawname", "");
    //     }
        
    // });

    body.on("click", function(e) {
        var self = $(e.target);

        if (self.hasClass("form-wrap")) {
            body.removeClass("form-open");
            $(".form-wrap").removeClass("form-wrap_open");
        }
    });

    $("#bigForm").submit(function(e) {
        e.preventDefault();

        var self = $(this);
        var formData = self.serialize();
        console.log(formData);

        $.ajax({
            type: "POST",
            url: "php/sendpresent.php",
            data: formData,
            success: function(data) {
                location = "thanks.html";
            }
        });
    });

    if ($("#thanksName").length) {
        $("#thanksName").text(localStorage.getItem("centoflawname"));
    };

    // forms //
});

