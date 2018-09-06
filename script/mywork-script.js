$(document).ready(function(){
    $('.section-link').click(function(e){
        e.preventDefault()
        var sectionTo = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(sectionTo).offset().top - 100
        }, 1000);
    });
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
            zoom: 1.25
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
            case "html5":
                thisSkill.skillType = "Programming Language";
                thisSkill.name = "HTML5/CSS3";
                thisSkill.rating = 3;
                thisSkill.overview = "I have used HTML5/CSS3 for web interface design for several years. As part of my work with HMTL5, I have extensive experience with the Bootstrap framework. By using Bootstrap and CSS, I have created dynamic, mobile-friendly webpages with both static and data-driven content. I have tied my work with HTML5 with my work in PHP via AJAX calls and have worked extensively with delivering and formatting data from an external data system. I have also used HTML5 in connection with XSLT to create data-driven, structured reports.";
                thisSkill.implementations = ["Create a user-centered GUI experience following common design standards", "Structure and display data in tables and in custom controls", "Implement modular design and use the proper HTML5 semantics in web design", "Create responsive and mobile friendly web applications", "Implement the bootstrap framework"];
                thisSkill.projects = [{name: "Maverick Supply Chain Management System Client", description: "The client for the Maverick SCMS application was written in HTML5/CSS3 and utilized the Bootstrap libraries. This application is responsive, mobile-friendly, and backwards compatible to IE8", link:""}, {name: "Maverick Systems Website", description:"The Maverick Systems website was created for Maverick Systems LLC upon its founding and is responsive and mobile-friendly. The website took advantage of the Bootstrap library", link:"mavericksystems.us"}, {name:"joelseidel.com", description:"This website was created using HTML5/CSS3. As with my other projects, it also makes use of the Bootstrap library", link:"joelseidel.com"}];
                break;
            case "javascript":
                thisSkill.skillType = "Programming Language";
                thisSkill.name = "JavaScript";
                thisSkill.rating = 3;
                thisSkill.overview = "I have used JavaScript in connection with web applications, in Node.JS applications, and for Windows Metro app development. In web development, I have used JS and the jQuery library extensively for to create dynamic content as well as tying in AJAX for PHP/data interactions. In Node.JS, I worked as part of the team that developed a multi-user online collaboration tool making use of a Node.JS server and the canvas tools of JS and HTML. Though now obsolete, I also used JavaScript for Windows Metro application development along with HTML for the application front-end development. In this regard, I am also familiar with application uses of JavaScript on platforms such as Apache Cordova and Windows Universal Apps.";
                thisSkill.implementations = ["Supplement front-end HTML/CSS with dynamic events and content", "Deliver content via AJAX queries to REST APIs", "Build the function which delivers this content via a modal form", "Implement the jQuery library in web pages"];
                thisSkill.rojects = [{name: "Maverick Supply Chain Management System Client", description: "The client for the Maverick SCMS application uses the jQuery JS library for handling events and certain display animations and adjustments. The system also interacts with the jQuery that is part of the Bootstrap libraries also implemented in the application", link:""}, {name:"Maverick Systems Website", description: "The Maverick Systems website uses the jQuery JS library for handling events and displaying certain content", link:"mavericksystems.us"}, {name:"joelseidel.com", description:"This website uses JavaScript/jQuery to handle events and animations. It is also how the content of this modal dialog is being shown to you right now"}];
                break;
            case "windows":
                thisSkill.skillType = "Operating System";
                thisSkill.name = "Microsoft Windows";
                thisSkill.rating = 5;
                thisSkill.overview = "I have used Microsoft Windows nearly exclusively for development. I am skilled with usage of each version of Windows dating back to Windows XP and have used each version in between for both everyday tasks and development. In addition to simply understanding the interface and the tools therein, I also have experience in using the Batch programming language through Windows Batch Files. I also have extensive experience with troubleshooting the operating system and its most common applications such as Word, Excel, and the rest of the Office Suite. In addition to all of this, I am skilled at running local testing environments within the Windows environment allow for the development and testing of applications meant for the web, Linux, and Android. Back when Windows 8/8.1/RE was making use of the Windows Metro applications, I worked on that development platform to develop applications in both XAML/C# and HTML/JS";
                thisSkill.implementations = ["Make use of the operating system for both general and advanced applications", "Install and use complex development environments", "Make extensive use of common applications such as the Microsoft Office Suite", "Manage users and security permissions", "Implement and maintain adequate firewalls and virus protection via Windows Defender"];
                break;
            case "linux":
                thisSkill.skillType = "Operating System";
                thisSkill.name = "Linux OS";
                thisSkill.rating = 2;
                thisSkill.overview = "I have used Linux based operating systems mostly as servers to host web applications or database servers. For hosting web applications using Apache, I installed Arch linux onto an old desktop and was able to successfully run the full LAMP stack (Linux, Apache, MySQL, PHP). I have also accomplished implementing the LAMP stack with the Archbang distro. Also with Archbang I implemented the Node.Js server and application which allowed for local connection to the application while our development team was not connected to the Internet. In addition to the previously listed distros, I also have used Linux Mint as a general purpose OS, though I am in no way as skilled with Linux as I am with Windows.";
                thisSkill.implementations = ["Implement the LAMP stack to host web applications", "Implement a Node.JS server to host a Node application", "Make use of the OS (Mint) for general purpose applications"];
                break;
            case "android":
                thisSkill.skillType = "Operating System";
                thisSkill.name = "Android OS";
                thisSkill.rating = 4;
                thisSkill.overview = "I have used the Android OS for several years and have developed applications for use on the Android system. I am familiar with the Android Studio IDE as well as the now obsolete Eclipse with ADT IDE. I am skilled in setting up Android Virtual Devices and debugging on devices as well as across several SDK versions. I have significant experience in Android GUI development and an understanding of the application organization and design standards";
                thisSkill.implementations = ["Make use of the operating system for both general and advanced applications", "Develop applications for use on Android", "Use cross-platform debugging tools via Android Studio and the Google developer tools", "Troubleshoot the Android system and solve a variety of technical issues"];
                break;
            case "mysql":
                thisSkill.skillType = "Database";
                thisSkill.name = "MySQL";
                thisSkill.rating = 4;
                thisSkill.overview = "";
                break;
            default:
                alert("yeet");
                break;
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
        $('#skill_project_header').empty();
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
        if(typeof projects === 'undefined'){
            return;
        }
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