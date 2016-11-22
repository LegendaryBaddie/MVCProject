$(document).ready(() => {
    
     const handleError = (message) => {
        $("#errorMessage").text(message);
    }
    
    const sendAjax = (action, data) => {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: (result, status, xhr) => {
                window.location = result.redirect;
            },
            error: (xhr, status, error) => {
                const messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
   
  
    $("#buttonSubmit").on("click", (e) => {
        e.preventDefault();
    
        if($("#name").val() == '' || $("#buttonText").val() == '') {
            handleError("All fields are required");
            return false;
        }

        sendAjax($("#buttonForm").attr("action"), $("#buttonForm").serialize());
        
        return false;
    });

    $("#signupSubmit").on("click", (e) => {
        e.preventDefault();
    
        if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
            handleError("All fields are required");
            return false;
        }
        
        if($("#pass").val() !== $("#pass2").val()) {
            handleError("Passwords do not match");
            return false;           
        }

        sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());
        
        return false;
    });

    $("#loginSubmit").on("click", (e) => {
        e.preventDefault();
    
        if($("#user").val() == '' || $("#pass").val() == '') {
            handleError("Username or password is empty");
            return false;
        }
    
        sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

        return false;
    });
   
});