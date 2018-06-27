$(document).ready(function(){
    var projectCard = $('.project-card');
    projectCard.hover(function(event){
        $(event.target).closest("div.card").css('box-shadow', '0 0 20px #808080');
    }, function(event){
        $(event.target).closest("div.card").css('box-shadow', '0 0 5px #808080');
    });
    var skillListing = $('.skill-listing');
    skillListing.hover(function(event){
        var thisSkillListing = $(event.target);
        thisSkillListing.stop().animate({
            zoom: 1.5
        });
        thisSkillListing.css("cursor", "pointer");
    }, function(event){
        $(event.target).stop().animate({
            zoom: 1
        });
    });
    skillListing.click(function(event){
        resetSkillModalLists();
        var thisSkillListing = $(event.target);
        var thisSkill = {};
        switch(thisSkillListing.data("skill")){
            case "csharp":
                thisSkill.skillType = "Programming Language";
                thisSkill.name = "C#";
                thisSkill.rating = 5;
                thisSkill.overview = "C# is my general purpose programming language of choice. I have been writing in C# since 2015 and have used it in WinForms, WPF, and console applications for a variety of projects. I have applied LINQ within C# and made use of several of the extended libraries to form a high level knowledge of the standard C# tools and the available resources for the language";
                thisSkill.implementations = ["Connect to and interact with SQLite, MySQL, and SQL Server databases", "Create user-centered WPF and WinForm GUI applications", "Serialize and store complex objects in files", "Implement object orient designed principles", "Make use of the .NET framework in application development"];
                thisSkill.projects = [{name:"Maverick Order Management System", description: "Entirely written in C#. Uses .NET framework and WinForms to create a user-friendly GUI. Interacts with cloud-hosted SQL Server database on Azure" , link:""}, {name:"Systems of Equations", description: "A console application which takes linear equations, splits apart the equations to determine their parts, and solve for the provided variable", link: ""}];
                break;
            case "cpp":
                thisSkill.skillType = "Programming Language";
                thisSkill.name = "C/C++";
                thisSkill.rating = 3;
                thisSkill.overview = "I learned C/C++ as part of my education at Berks Career and Technology Center. I have been writing in C/C++ since 2014 and used it in WinForms, console applications, and applied it via the CLR. My knowledge of C/C++ is sufficient to pursue advanced techniques and implementations of the language.";
                thisSkill.implementations = ["Connect to and interact with SQLite, MySQL, and SQL Server databases", "Create user-centered WinForm GUI applications", "Develop user-friendly yet efficient console applications", "Implement object oriented design principles", "Make use of the .NET framework and CLR"];
                thisSkill.projects = [{name:"SQL Server Database Interaction", description: "A console application to interact with a Azure cloud-hosted SQL Server database using the C/C++ developer library from Microsoft. Allows for running queries and nonqueries and display results", link: ""}];
                break;
            case "java":
                thisSkill.skillType = "Programming Language";
                thisSkill.name = "Java";
                thisSkill.rating = 5;
                thisSkill.overview = "Java is my second-best programming language. I have been writing Java since 2015 and have made extensive use of Java over several platforms. Currently, I am working significantly with Java as a server-side programming language to create complex data systems functioning around Sun's HTTPS libraries. I have also used Java in console applications and Java Swing/Fx to create GUI applications. I also have used Java in an Android context to create an application utilizing SQLite and a cloud data-driven application interacting with an Azure-hosted MS SQL Serve databaser";
                thisSkill.implementations = ["Connect to and interact with SQLite, MySQL, and SQL Server databases", "Create user-centered GUI applications by making use of Java FX/Swing", "Utilize Android development tools and XML to create engaging and responsive mobile applications", "Implement object oriented design principles", "Utilize server-side development techniques to create a high traffic, high volume data system using an HTTPS server library"];
                thisSkill.projects = [{name:"Maverick Supply Chain Management System Data", description: "A high traffic, high volume HTTPS server written in Java to handle the database interaction of the Maverick SCMS. Used handler classes to abstract functionality and modularize queries to the main MySQL database", link:""}, {name:"Student Planner Application", description:"An Android application which makes use of XML and Android design libraries to provide a user-centered GUI for displaying and maintaining lists of classes and assignments. Made use of the SQLite JDBC connectivity libraries to interact with a SQLite database.", link:""}];
                break;
            case "php":
                thisSkill.skillType = "Programming Language";
                thisSkill.name = "PHP";
                thisSkill.rating = 4;
                thisSkill.overview = "PHP is my web development language of choice. I have worked extensively with the server-side scripting implementations of PHP without using a framework. I also have used PHP to create an API application which employees object oriented PHP, as well as using JSON to pass application between the client and server. I am also experienced in using the connectivity libraries to various database systems for server-side data interactions";
                thisSkill.implementations = ["Connect to and interact with MySQL and SQL Server databases", "Utilize async design principles to facilitate data delivery to the client", "Implement object oriented design", "Perform complex queries and data organization on the server-side"];
                thisSkill.projects = [{name:"Maverick Supply Chain Management System Client", description: "Used a link between the client application and data system to create modal dialogs in PHP to display retrieved data. The original application was written using PHP as the entire interface between the client and database.", link:""}, {name: "Maverick Order Management System Web", description: "Written in PHP to interact between the web client and the Azure cloud-hosted SQL Server database.", link:""}];
                break;
            default:
                alert("I'm sorry :(\nI'm still working on this. Try again tomorrow. My daily updates usually come out around 11PM");
        }
        showSkillModal(thisSkill);
        $('#skill_modal').modal();
    });
    function resetSkillModalLists(){
        for(i = 1; i <= 5; i++){
            var thisStarName = "#skill_star_" + i.toString();
            $(thisStarName).removeClass("checked");
        }
        $('#skill_implementation_list').empty();
        $('#skill_project_list').empty();
    }
    function showSkillModal(thisSkill){
        var skillModal = $('#skill_modal');
        $('#skill_type_label').text(thisSkill.skillType);
        $('#skill_name_label').text(thisSkill.name);
        assignSkillRatingStars(thisSkill.rating);
        $('#skill_overview').text(thisSkill.overview);
        displayImplementations(thisSkill.name, thisSkill.implementations);
        displayProjects(thisSkill.name, thisSkill.projects);
    }
    function assignSkillRatingStars(rating){
        for(i = 1; i <= rating; i++){
            var thisStarName = "#skill_star_" + i.toString();
            $(thisStarName).addClass("checked");
        }
    }
    function displayImplementations(skillName, implementations){
        var implementationText = "I've used " + skillName + " to...";
        $('#skill_implementation_header').text(implementationText);
        implementations.forEach(function(thisImplementation, index){
            var implementationDisplayString = "<li><p>" + thisImplementation + "</p></li>";
            $('#skill_implementation_list').append(implementationDisplayString);
        });
    }
    function displayProjects(skillName, projects){
        var projectText = "Major projects I have worked on in " + skillName;
        $('#skill_project_header').text(projectText);
        projects.forEach(function(thisProject, index){
            var projectDisplay;
            if(thisProject.link === ""){
                projectDisplay = "<li><h6>" + thisProject.name + "</h6><p>" + thisProject.description + "</p></li>";
            } else {
                projectDisplay = "<li><h6>" + thisProject.name + "</h6><p>" + thisProject.description + "</p><p>Link: <a href='" + thisProject.link + "'></a></p></li>";
            }
            $('#skill_project_list').append(projectDisplay);
        });
    }
});