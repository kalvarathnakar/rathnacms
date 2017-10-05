angular.module('app.controllers', [])

.controller('registrationCtrl', ['$scope', '$stateParams', 'BlankFactory', '$ionicPopup', '$ionicHistory', '$state', '$rootScope', '$localStorage', '$ionicLoading',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, BlankFactory, $ionicPopup, $ionicHistory, $state, $rootScope, $localStorage, $ionicLoading) {
    //$scope.currentDate = new Date();
    // $scope.minDate = new Date(1989, 6, 1);
    // $scope.age="18 years"
    $rootScope.loginresult = 0;
    console.log($rootScope.loginresult);
    $scope.currentDate = new Date();
    $rootScope.timeValue = new Date();
    $rootScope.datetimeValue = new Date();
    $scope.rg = {
        name: "",
        surname: "",
        membershipID: "",
        confirmmembershipID: "",
        mobileNumber: "",
        boothNumber: "",
        idproof: "",
        IDproofNumber: "",
        selectedDate1: "",
        dob: "",
        gender: "",
        caste: "",
        age: "",
        confirm_mobile_number: "",
        graduate: false,
        upamandal:""

    }

    $scope.website = function () {
        window.open("https://188.42.96.92/", '_system');
    }
    $scope.rg.gender = "Male";
    $scope.rg.age = 18;
    $scope.orig = angular.copy($scope.rg);
    $scope.reset = function () {

        $scope.rg = angular.copy($scope.orig);

        $scope.selectedDate1 = "";
        $scope.selectImage = 0;
        $scope.$destroy;
        //  $scope.MemberRegistration.$setPristine(true);
    }
    var date = new Date();
    $scope.show = function () {
        $ionicLoading.show({
            template: 'Loading...',

        }).then(function () {
            console.log("The loading indicator is now displayed");
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide().then(function () {
            console.log("The loading indicator is now hidden");
        });
    };
    //$scope.getDate = function (data) {
    //    // alert();
    //    console.log(data);
    //    $scope.age = "Age: " + (date.getFullYear() - data.dob.getFullYear()) + " Years";
    //    console.log($scope.age);
    //}
    $scope.imageUpload = function (event) {

        var files = event.target.files; //FileList object
        var file = files[0];
        var reader = new FileReader();
        $scope.selectImage = 1;
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(file);
        for (var i = 0; i < files.length; i++) {

        }
    }
    $scope.imageIsLoaded = function (e) {
        $scope.$apply(function () {
            $scope.stepsModel = (e.target.result);

            $scope.isImageUpload = 0;
        });
    }
    function loadProofDetails() {
        BlankFactory.getIdProofDetails().then(function (res) {
            $scope.idproof = res;
        })
    }
    function loadCastDetails() {
        BlankFactory.getAllCast().then(function (res) {
            $scope.casts = res;
        })
    }
    function loadfunction() {
        $scope.reset();
    }
    //function loadhierarchylevels() {
    //    BlankFactory.getHierarchylevels().then(function (res) {
    //        $scope.comaignid = res[2].id;
    //        BlankFactory.getLoactions($scope.comaignid).then(function (res) {
    //            $scope.state = res[0].name;
    //            $scope.boothcode = res[0].ec_code;
    //            $scope.stateid = res[0].id;


    //            BlankFactory.getDistricts($scope.comaignid, $scope.stateid).then(function (res) {
    //                $scope.district = res;
    //                $scope.showassembly = 0;
    //                $scope.showMandal = 0;
    //                $scope.showUpaMandal = 0;
    //                $scope.showBooth = 0;
    //                $scope.boothcode = $scope.boothcode + res[0].ec_code;
    //                $scope.districtid = res[0].hierarchy_level;



    //            })
    //        })
    //    })
    //}
    function loadParliament() {
        BlankFactory.getParliament().then(function (res) {
          
            $scope.parliament = res;
            $scope.showassembly = 0;
            $scope.showMandal = 0;
            $scope.showUpaMandal = 0;
            $scope.showBooth = 0;
            $scope.boothcode = $scope.boothcode + res[0].ec_code;
            $scope.hid = res[0].hierarchy_level;



        })
    }
    loadProofDetails();
    loadCastDetails();
    //loadhierarchylevels();
    loadParliament();
    loadfunction();
    $scope.showassembly = 0;
    $scope.showUpaMandal = 0;
    $scope.showBooth = 0;
    $scope.showBoothnumber = 0;
    $scope.showMandalup = 0;
    $scope.re = true;

    $scope.getAssembly = function (data) {
        if (data.ditrict != undefined) {
            BlankFactory.getAssembly(data.ditrict, $scope.hid).then(function (res) {
                var res = res.loc_data;
                $scope.assemblies = res;
                $scope.rg.assembly="";
                $scope.showassembly = 1;
                $scope.showMandal = 0;
                $scope.showUpaMandal = 0;
                $scope.showBooth = 0;
                $scope.showBoothnumber = 0;
                $scope.showMandalup = 0;
                $scope.assemblieshid = res[0].hierarchy_level;
            })
        }
        else {
            $scope.showassembly = 0;
            $scope.showMandal = 0;
            $scope.showUpaMandal = 0;
            $scope.showBooth = 0;
            $scope.showMandalup = 0;
            $scope.showBoothnumber = 0;
        }
        
    }
    $scope.graduateresult = "No"
    $scope.getgraduate = function (data) {
        if (data.graduate == true) {
            $scope.graduateresult="Yes"
        }
        else {
            $scope.graduateresult = "No"
        }

    }
    $scope.getMandals = function (data) {
        if (data.assembly != undefined) {
            BlankFactory.getMandals(data.assembly, $scope.assemblieshid).then(function (res) {
                var res = res.loc_data;
                  $scope.mandals = res;
                  $scope.rg.mandal = "";
                  $scope.showMandal = 1;
                  $scope.showUpaMandal = 0;
                  $scope.showBooth = 0;
                  $scope.showBoothnumber = 0;
                  $scope.mandalid = res[0].hierarchy_level;
        })

        }
        else {
           
            $scope.showMandal = 0;
            $scope.showUpaMandal = 0;
            $scope.showBooth = 0;
            $scope.showBoothnumber = 0;
            $scope.showMandalup = 0;
        }
       
    }

    $scope.getUpaMandals = function (data) {
        if (data.mandal != undefined) {
            BlankFactory.getMandals(data.mandal, $scope.mandalid).then(function (res) {
                var res1 = res.loc_data;
                $scope.upamandals = res1;
                $scope.villages = res.village_data;
                $scope.showUpaMandal = 1;
                $scope.rg.upamandal = "";
                 $scope.showMandalup = 1;
                 $scope.rg.village = "";
                $scope.showBooth = 0;
                $scope.showBoothnumber = 0;
                $scope.upamandalid = res1[0].hierarchy_level;
                $scope.villageid = res.village_data[0].hierarchy_level;
                $localStorage.village = res.village_data;
            })

        }
        else {
           
            $scope.showMandalup = 0;
            $scope.showUpaMandal = 0;
            $scope.showBooth = 0;
            $scope.showBoothnumber = 0;
        }

    }
    $scope.getVillages = function (data) {
        if (data.upamandal != undefined && data.upamandal != "") {
           
            BlankFactory.getVillages(data.upamandal, $scope.upamandalid).then(function (res) {
             var res = res.loc_data;
                $scope.rg.village = "";
            $scope.villages = res;
            $scope.showUpaMandal = 1;
            $scope.showBooth = 0;
            $scope.showBoothnumber = 0;
            $scope.villageid = res[0].hierarchy_level;

            
        })
        }
        else {
            $scope.showUpaMandal = 0;
            $scope.showBooth = 0;
            $scope.showBoothnumber = 0;
            $scope.showUpaMandal = 1;
            $scope.villages = $localStorage.village;
            $scope.rg.village = "";
            $scope.re = true;
        }
       
    }
    $scope.getBooths = function (data) {
        if (data.village != undefined) {

            BlankFactory.getBooths(data.village, $scope.villageid).then(function (res) {
                var res = res.loc_data;
                $scope.rg.booths="";
                $scope.booths = res;
                $scope.showBooth = 1;
                $scope.showBoothnumber = 0;
                $scope.boothcodes = data.village;
                BlankFactory.getParentId(data.village).then(function (res) {

                    $scope.rg.upamandal = res.loc_data.id.toString();

                })
            })
        }
        else {
            $scope.showBooth = 0;
            $scope.showBoothnumber = 0;
        }
       
    }
    $scope.getBoothNumber = function (data) {
        if (data.booths != "") {

            BlankFactory.getBoothNumber(data.booths).then(function (res) {
            //var res = res.loc_data;
                $scope.rg.boothNumber = res.booth_code;
                $scope.boothcodes = data.booths;
                console.log($scope.boothcodes);
                $scope.showBoothnumber = 1;


            })
           
        }
        else {
             $scope.showBoothnumber = 0;
            BlankFactory.getBoothNumber($scope.rg.village).then(function (res) {
                $scope.rg.boothNumber = res.booth_code;
                $scope.boothcodes = $scope.rg.village;
                console.log($scope.boothcodes);
                $scope.showBoothnumber = 1;


            })
        }

    }
    $scope.submit = function (data) {
        $scope.show();
           if (data.membershipID === data.confirmmembershipID && data.mobileNumber === data.confirm_mobile_number) {

                    if (data.IDproofNumber != "" && data.IDproofNumber.length < 10) {
                        if (data.IDproofNumber != data.confirmvoterid) {
                            $scope.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Registration',
                                cssClass: 'button-royal',
                                template: "Invalid Voter ID"

                            });
                        }
                        else {
                            finalcode();
                        }
                    }
                    else {
                        if (data.IDproofNumber != "") {
                            if (data.IDproofNumber != data.confirmvoterid) {
                                $scope.hide();
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Registration',
                                    cssClass: 'button-royal',
                                    template: "Invalid Voter ID"

                                });
                            }
                            else {
                                finalcode();
                            }
                        }
                        else {
                            finalcode();
                        }

                    }


                }
                else {
                    $scope.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Registration',

                        template: "Mismatch Membership ID or Mobile Number, please re-enter."

                    });
                    alertPopup.then(function (res) {
                        if (res) {
                            $scope.myStyle = {
                                'background': "rgba(0,0,0,0.5) !important"
                            }
                            console.log($scope.myStyle);
                        }
                    })
                }



                function finalcode() {
                    var file = document.getElementById("file").files[0];
                    //var date = $scope.rg.dob.getFullYear() + "-" + ($scope.rg.dob.getMonth() + 1) + "-" + $scope.rg.dob.getDate();

                    BlankFactory.addMember(data, file, $scope.boothcodes).then(function (res) {


                        if (res.data.msg === "You are registered successfully") {
                            $scope.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Registration',
                                cssClass: 'button-royal',
                                template: res.data.msg + ", <br>" + "Dear " + res.data.name + ",<br>" + "Username :" + res.data.username + "<br>" + "Password :" + res.data.password

                            });
                            alertPopup.then(function (res) {
                                if (res) {

                                    $scope.reset();
                                    $state.go("menu.home");
                                    $ionicHistory.nextViewOptions({
                                        disableBack: true
                                    });
                                }
                            })
                        }
                        if (res.data.mobile_number == "Mobile Number already registered") {
                            $scope.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Login',

                                template: res.data.mobile_number[0]
                            });

                        }
                        if (res.data.membership_id == "Membership Id already registered") {
                            $scope.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Login',

                                template: res.data.membership_id[0]
                            });

                        }
                        if (res.data.age == "Age should be minimum 18 Years old") {
                            $scope.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Registration',

                                template: res.data.age[0]
                            });

                        }
                        if (res.data.idproof_number == "Id Proof Already Registered") {
                            $scope.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Registration',

                                template: res.data.idproof_number[0]
                            });

                        }
                    }, function (res) {
                        $scope.hide();
                    })
                }

        if (window.Connection) {
            //  alert("rathna" + window.Connection)
            if (navigator.connection.type == Connection.NONE) {

                var alertPopup = $ionicPopup.alert({
                    title: 'Internet',

                    template: "No Internet connection"
                });

            }
            else {
               
            }

        }
      

    }

    $scope.showidproof = 0;
    $scope.showprrofNumber = function (data) {
        if (data.idproof != "") {
            $scope.showidproof = 1;
            $scope.showerror = true;


        }
        else {

            $scope.showidproof = 0;
            $scope.rg.IDproofNumber = "";
            $scope.showerror = false;
        }
    }
    $scope.hideError = function () {
        $scope.showerror = false;
    }
}])
.controller('myaccountCtrl', ['$scope', '$stateParams', 'BlankFactory', '$ionicPopup', '$ionicHistory', '$state', '$localStorage', '$ionicLoading',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, BlankFactory, $ionicPopup, $ionicHistory, $state, $localStorage, $ionicLoading) {
    //$scope.currentDate = new Date();
    // $scope.minDate = new Date(1989, 6, 1);
    $scope.rg = {
        name: "",
        surname: "",
        membershipID: "",
        confirmmembershipID: "",
        mobileNumber: "",
        boothNumber: "",
        idproof: "",
        IDproofNumber: "",
        selectedDate1: "",
        dob: "",
        gender: "",
        caste: "",
        age: "",
        confirm_mobile_number: "",
        graduate: false,
        upamandal: "",
        confirmvoterid:""

    }
    $scope.showassembly = 1;
    $scope.showMandal = 1;
    $scope.showUpaMandal = 1;
    $scope.showBooth = 1;
    $scope.showMandalup = 1;
    $scope.showvoterid = 0;
    $scope.re = true;


    $scope.show = function () {
        $ionicLoading.show({
            template: 'Loading...',

        }).then(function () {
            console.log("The loading indicator is now displayed");
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide().then(function () {
            console.log("The loading indicator is now hidden");
        });
    };
    var date = new Date();
    $scope.orig = angular.copy($scope.rg);
    $scope.reset = function () {
        $scope.rg = angular.copy($scope.orig);
    }

    $scope.selectImage = 0;
    $scope.imageUpload = function (event) {

        var files = event.target.files; //FileList object
        var file = files[0];
        var reader = new FileReader();
        $scope.selectImage = 1;
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(file);
        for (var i = 0; i < files.length; i++) {

        }
    }
    $scope.imageIsLoaded = function (e) {
        $scope.$apply(function () {
            $scope.stepsModel = (e.target.result);

            $scope.isImageUpload = 0;
        });
    }
    //$scope.details = $localStorage.userdetails;
    function loadProofDetails() {
        BlankFactory.getIdProofDetails().then(function (res) {
            $scope.idproof = res;
        })
    }
    function loadCastDetails() {
        BlankFactory.getAllCast().then(function (res) {
            $scope.casts = res;
        })
    }
    function loadParliament() {
        BlankFactory.getParliament().then(function (res) {
            $scope.parliament = res;
            $scope.hid = res[0].hierarchy_level;



        })
    }
    $localStorage.village = "";
    $scope.getgraduate = function (data) {
        if (data.graduate == true) {
            $scope.graduateresult = "Yes"
        }
        else {
            $scope.graduateresult = "No"
        }

    }
    loadParliament();
    function loadData() {
        $scope.show()
        BlankFactory.getUserDetails($localStorage.userid).then(function (result) {
            $scope.hide();
           
            $scope.rg.name = result.name;
            if (result.graduate) {
                $scope.graduateresult = "Yes"
            }
            else {
                $scope.graduateresult = "No"
            }

            $scope.rg.graduate = result.graduate;
            $scope.rg.surname = result.surname;
            $scope.rg.membershipID = result.membership_id;
            $scope.rg.mobileNumber = result.mobile_number;
            $localStorage.parliament = result.parliamentary[0];
            $localStorage.assembley = result.assembly[0];
            $localStorage.mandal = result.mandal[0];
            $localStorage.upamandals = result.upamandal[0];
            $localStorage.upamandal = result.village[0];
            if (result.booth_id != "") {
                $scope.showBoothnumber = 1;
            }
            else {
                $scope.showBoothnumber = 0;
            }
            $scope.rg.boothNumber = result.booth_id;
            $localStorage.boothid = result.booth_id;
            $scope.rg.ditrict = result.parliamentary[1].toString();

            ////if (result.idproof_id != "") {
            ////    $scope.showidproof = 1
            ////    $scope.rg.idproof = result.idproof_id.toString();

            ////}
            //else {
            //    $scope.showidproof = 0;
            //    $scope.rg.idproof = result.idproof_id.toString();
            //}

            $scope.rg.gender = result.gender;
            $scope.rg.age = result.age;
            $scope.hide();
            BlankFactory.getAssembly(result.parliamentary[1], result.parliamentary[0]).then(function (res) {
                $scope.assemblies = res.loc_data;
                $scope.rg.assembly = result.assembly[1].toString();
            })

            BlankFactory.getMandals(result.assembly[1], result.assembly[0]).then(function (res) {
                $scope.mandals = res.loc_data;
                $scope.rg.mandal = result.mandal[1].toString();

            })
            BlankFactory.getMandals(result.mandal[1], result.mandal[0]).then(function (res) {
                $scope.upamandals = res.loc_data;
                $scope.rg.upamandal = result.upamandal[1].toString();

            })
            BlankFactory.getVillages(result.upamandal[1], result.upamandal[0]).then(function (res) {
                $scope.villages = res.loc_data;
                
                $scope.rg.village = result.village[1].toString();
            })


            BlankFactory.getBooths(result.village[1], result.village[0]).then(function (res) {
                $scope.booths = res.loc_data;
                $scope.rg.booths = result.booth[1].toString();


            })



            // alert(res.idproof_id);

            if (result.idproof_number != "") {
                $scope.showidproofer = 0;
            }
            else {
                $scope.showidproofer = 0;
            }
            $scope.rg.IDproofNumber = result.idproof_number;

            $scope.src = result.photo;
            $scope.rg.gender = result.gender;
            $scope.rg.caste = result.usercategory_id.toString();

            // $state.go("menu.myaccount");
            // $localStorage.userdetails = res;
            // console.log($localStorage.userdetails);
            // $scope.closePopover();

        }, function (res) {

            $scope.hide();
        })
        if (window.Connection) {
            //  alert("rathna" + window.Connection)
            if (navigator.connection.type == Connection.NONE) {
                $scope.hide()
                var alertPopup = $ionicPopup.alert({
                    title: 'Internet',

                    template: "No Internet connection"
                });

            }
            else {
                
            }

        }
       
    }
    loadProofDetails();
    loadCastDetails();
    loadData();
    $scope.showconfirm = 0;
    $scope.showmember = 0;
    $scope.showidproofer = 0;
    $scope.editMembershipID = function (data) {
        if (data.IDproofNumber.length >=9 && data.IDproofNumber.length >0) {
            $scope.showidproofer = 1;
        }
        else {
            
                $scope.showidproofer = 0;
           
        }

    }
    $scope.getAssembly = function (data) {
        if (data.ditrict != undefined) {
            BlankFactory.getAssembly(data.ditrict, $scope.hid).then(function (res) {
                var res = res.loc_data;
                $scope.assemblies = res;
                $scope.rg.assembly = "";
                $scope.showassembly = 1;
                $scope.showMandal = 0;
                $scope.showUpaMandal = 0;
                $scope.showBooth = 0;
                $scope.showBoothnumber = 0;
                $scope.showMandalup = 0;
                $scope.assemblieshid = res[0].hierarchy_level;
            })
        }
        else {
            $scope.showassembly = 0;
            $scope.showMandal = 0;
            $scope.showUpaMandal = 0;
            $scope.showBooth = 0;
            $scope.showMandalup = 0;
            $scope.showBoothnumber = 0;
        }

    }
    $scope.getMandals = function (data) {
        if (data.assembly != undefined) {
            BlankFactory.getMandals(data.assembly, $localStorage.assembley).then(function (res) {
                var res = res.loc_data;
                $scope.mandals = res;
                $scope.rg.mandal = "";
                $scope.showMandal = 1;
                $scope.showUpaMandal = 0;
                $scope.showBooth = 0;
                $scope.showMandalup = 0;
                $scope.showBoothnumber = 0;
                $scope.mandalid = res[0].hierarchy_level;
            })

        }
        else {

            $scope.showMandal = 0;
            $scope.showUpaMandal = 0;
            $scope.showUpaMandal = 0;
            $scope.showBooth = 0;
            $scope.showBoothnumber = 0;
            $scope.showMandalup = 0;
        }

    }

    $scope.getUpaMandals = function (data) {
        if (data.mandal != undefined) {
            BlankFactory.getMandals(data.mandal, $localStorage.mandal).then(function (res) {
                var res1 = res.loc_data;
                $scope.upamandals = res1;
                $scope.villages = res.village_data;
                $scope.showUpaMandal = 1;
                $scope.rg.upamandal = "";
                $scope.showMandalup = 1;
                $scope.rg.village = "";
                $scope.showBooth = 0;
                $scope.showBoothnumber = 0;
                $scope.upamandalid = res1[0].hierarchy_level;
                $scope.villageid = res.village_data[0].hierarchy_level;
                $localStorage.village = res.village_data;
            })

        }
        else {
             
            $scope.showMandalup = 0;
            $scope.showUpaMandal = 0;
            $scope.showBooth = 0;
            $scope.showBoothnumber = 0;
        }

    }
    $scope.getVillages = function (data) {
        if (data.upamandal != undefined && data.upamandal !="") {

            BlankFactory.getVillages(data.upamandal, $localStorage.upamandals).then(function (res) {
                var res = res.loc_data;
                $scope.rg.village = "";
                $scope.villages = res;
                $scope.showUpaMandal = 1;
                $scope.showBooth = 0;
                $scope.showBoothnumber = 0;
                $scope.villageid = res[0].hierarchy_level;
            })
        }
        else {
            BlankFactory.getMandals(data.mandal, $localStorage.mandal).then(function (res) {
               
                $scope.villages = res.village_data;
                
               // $scope.upamandalid = res1[0].hierarchy_level;
                //$scope.villageid = res.village_data[0].hierarchy_level;
                //$localStorage.village = res.village_data;
            })
            $scope.showUpaMandal = 1;
            $scope.rg.village = "";
            $scope.showUpaMandal = 0;
            $scope.showBooth = 0;
            $scope.showBoothnumber = 0;
            $scope.showUpaMandal = 1;
            $scope.re = true;
        }

    }
    $scope.getBooths = function (data) {
        if (data.village != undefined) {

            BlankFactory.getBooths(data.village, $localStorage.upamandal).then(function (res) {
                var res = res.loc_data;
                $scope.rg.booths = "";
                $scope.booths = res;
                $scope.showBooth = 1;
                $scope.showBoothnumber = 0;
                $scope.boothcodes = data.village;
                BlankFactory.getParentId(data.village).then(function (res) {
                    console.log(res.loc_data.id)
                    $scope.rg.upamandal = res.loc_data.id.toString();

                })
            })
        }
        else {
            $scope.showBooth = 0;
            $scope.showBoothnumber = 0;
        }

    }
    $scope.getBoothNumber = function (data) {
        if (data.booths != "") {
            BlankFactory.getBoothNumber(data.booths).then(function (res) {
                
                $scope.rg.boothNumber = res.booth_code;
                $scope.boothcodes = data.booths;
                console.log($scope.boothcodes);
                $scope.showBoothnumber = 1;


            })

        }
        else {
            $scope.showBoothnumber = 0;
            BlankFactory.getBoothNumber($scope.rg.village).then(function (res) {
               
                $scope.rg.boothNumber = res.booth_code;
                $scope.boothcodes = $scope.rg.village;
                console.log($scope.boothcodes);
                $scope.showBoothnumber = 1;


            })
        }

    }
   
    $scope.submit = function (data) {
        $scope.show();
          checkcode();



                function checkcode() {

                    if (data.IDproofNumber != "" && data.IDproofNumber.length < 10) {
                        if (data.IDproofNumber != data.confirmvoterid) {
                            $scope.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'My Profile',
                                cssClass: 'button-royal',
                                template: "Invalid Voter ID"

                            });
                        }
                        else {

                            checkinner();

                        }
                    }
                    else if (data.IDproofNumber != "" && $scope.rg.confirmvoterid.length == 10 && data.IDproofNumber.length == 10) {
                        if (data.IDproofNumber != data.confirmvoterid) {
                            $scope.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'My Profile',
                                cssClass: 'button-royal',
                                template: "Invalid Voter ID"

                            });
                        }
                        else {
                            checkinner();
                        }
                    }
                    else {
                        checkinner();
                    }

                    //else {

                    //    if (data.confirmvoterid == undefined || data.confirmvoterid !="") {
                    //        checkinner();

                    //    }
                    //    else {

                    //        if (data.IDproofNumber != data.confirmvoterid) {
                    //            $scope.hide();
                    //            var alertPopup = $ionicPopup.alert({
                    //                title: 'My Profile',
                    //                cssClass: 'button-royal',
                    //                template: "Voter ID missmatch"

                    //            });

                    //        }
                    //        else {
                    //            checkinner();
                    //        }
                    //    }

                    //}

                    //if ($scope.showvoterid == 1) {
                    //    if (data.IDproofNumber != data.confirmvoterid) {
                    //        $scope.hide();
                    //        var alertPopup = $ionicPopup.alert({
                    //            title: 'Registration',

                    //            template: "Mismatch Voter ID  please re-enter."

                    //        });
                    //    }
                    //    else {

                    //    }
                    //}

                    //else {
                    //    checkinner();
                    //}
                }
                function checkinner() {

                    var file = document.getElementById("file").files[0];
                    //var date = $scope.rg.dob.getFullYear() + "-" + ($scope.rg.dob.getMonth() + 1) + "-" + $scope.rg.dob.getDate();

                    BlankFactory.updateMember(data, file, $localStorage.userid, $scope.boothcodes).then(function (res) {
                        //alert(res.date_of_birth[0]);
                        if (res.data.msg === "Your profile have been updated") {
                            $scope.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'My Profile',
                                cssClass: 'button-royal',
                                template: "Your Profile updated successfully"

                            });
                            alertPopup.then(function (res) {
                                if (res) {
                                    $state.go("menu.homeforlogin");

                                    $ionicHistory.nextViewOptions({
                                        disableBack: true
                                    });
                                }
                            })
                        }
                        if (res.data.age == "Age should be minimum 18 Years old") {
                            $scope.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'My Profile',

                                template: res.data.age[0]
                            });

                        }
                        if (res.data.idproof_number == "Id Proof Already Registered") {
                            $scope.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Registration',

                                template: res.data.idproof_number[0]
                            });

                        }
                    }, function (res) {

                        $scope.hide();
                    })
                }
        
               
             
        
        if (window.Connection) {
            //  alert("rathna" + window.Connection)
            if (navigator.connection.type == Connection.NONE) {
                $scope.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Internet',

                    template: "No Internet connection"
                });

            }
            else {
              
            }
        }




    }

    $scope.confirmMember = function () {
        if ($scope.rg.membershipID === $scope.rg.confirmmembershipID) {

        }
        else {
            var alertPopup = $ionicPopup.alert({
                title: 'Membership Number',
                cssClass: 'button-royal',
                buttons: [

            {
                text: '<b>OK</b>',
                type: 'button-royal',

            }
                ],
                template: "Wrong membership Number"
            });
        }



    }
    $scope.editvoter = function () {
        $scope.showidproofer = 0;
    }
    $scope.showprrofNumber = function (data) {
        if (data.idproof != "") {
            $scope.showidproof = 1;
            $scope.showerror = true;


        }
        else {

            $scope.showidproof = 0;
            $scope.rg.IDproofNumber = "";
        }
    }
    $scope.hideError = function () {
        $scope.showerror = false;
    }
}])
.controller('cartCtrl', ['$scope', '$stateParams', '$state', 'BlankFactory', '$rootScope', '$location', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, BlankFactory, $rootScope, $location, $ionicPopup) {


    BlankFactory.getNews().then(function (res) {
        $rootScope.newsData = res.items;
        // $state.go("menu.events");

    }, function (msg) {
        //alert();
        // $state.go("menu.events");
    })
    $scope.getdata = function (data) {
        window.location.href = data;
        //  alert("hi")
        if (window.Connection) {
            //  alert("rathna" + window.Connection)
            if (navigator.connection.type == Connection.NONE) {

                var alertPopup = $ionicPopup.alert({
                    title: 'Internet',

                    template: "No Internet connection"
                });

            }
            else {
                window.location.href = data;
            }

        }


    }

}])

.controller('loginCtrl', ['$scope', '$stateParams', 'BlankFactory', '$ionicPopup', '$ionicHistory', '$state', '$localStorage', '$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, BlankFactory, $ionicPopup, $ionicHistory, $state, $localStorage, $rootScope) {
    $localStorage.userid = 0;
    $scope.home = function () {
        $state.go("menu.home");
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
    }
    $scope.user = {
        username: "",
        password: "",

    };
    $scope.orig = angular.copy($scope.user);
    $scope.reset = function () {
        $scope.user = angular.copy($scope.orig);
    }
    $scope.login = function (data) {
        $localStorage.password = $scope.user.password;
        if ($scope.user.username == "" || $scope.user.password == "") {

            var alertPopup = $ionicPopup.alert({
                title: 'Login',

                template: "Please enter Login Credentials"
            });
        }
        else {
            BlankFactory.isLogin(data).then(function (res) {
                if (res.data.msg === "Invalid Username/Password") {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login',

                        template: res.data.msg
                    });

                }

                else {

                    if (res.data.group === "membership") {

                        $localStorage.userid = res.data.user_id;
                        $localStorage.loginresults = res.data.group;
                        $rootScope.loginresult = $localStorage.loginresults;

                        console.log("logintCtrl--" + $localStorage.loginresults)
                        $scope.reset();
                        $state.go("menu.homeforlogin");
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                    }
                    if (res.data.group === "administration") {

                        $localStorage.userid = res.data.user_id;
                        $localStorage.loginresults = res.data.group;
                        $rootScope.loginresult = $localStorage.loginresults;

                        console.log("logintCtrl--" + $localStorage.loginresults);
                        $state.go("menu.superadmin");
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        $scope.reset();
                    }


                    console.log($localStorage.userid);


                    //  $rootScope.loginresult = true;
                    //var alertPopup = $ionicPopup.alert({
                    //    title: 'Membership Number',

                    //    template: "Login Successfully"
                    //});
                    //alertPopup.then(function (res) {
                    //    if (res) {

                    //    }
                    //})
                }

            })
        }
    }
        if (window.Connection) {
            //  alert("rathna" + window.Connection)
            if (navigator.connection.type == Connection.NONE) {

                var alertPopup = $ionicPopup.alert({
                    title: 'Internet',

                    template: "No Internet connection"
                });

            }
            else {
                 

        }

    }
    $scope.join = function () {
        $ionicHistory.clearCache().then(function () { $state.go('menu.registration') });
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
    }
    $scope.forgotpage = function () {
        $state.go("menu.forgotpassword");
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
    }
}])
.controller('forgotpasswordCtrl', ['$scope', '$stateParams', 'BlankFactory', '$ionicPopup', '$ionicHistory', '$state', '$ionicLoading',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, BlankFactory, $ionicPopup, $ionicHistory, $state, $ionicLoading) {
    $scope.show = function () {
        $ionicLoading.show({
            template: 'Loading...',
            duration: 3000
        }).then(function () {
            console.log("The loading indicator is now displayed");
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide().then(function () {
            console.log("The loading indicator is now hidden");
        });
    };
    $scope.submit = function (data) {
        $scope.show();
        BlankFactory.getPassword(data).then(function (res) {
                    if (res.data.msg === "Invalid Username") {
                        $scope.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Forgot password',

                            template: res.data.msg
                        });
                    }
                    if (res.data.msg === "Success") {
                        $scope.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Forgot password',

                            template: "New Password sent to your registered Mobile No" + "<br>" + "Username :" + res.data.username + "<br>" + "Password :" + res.data.password
                        });
                        alertPopup.then(function (res) {
                            if (res) {
                                $state.go("menu.home");
                            }
                        })
                    }

                })
        if (window.Connection) {
            //  alert("rathna" + window.Connection)
            if (navigator.connection.type == Connection.NONE) {
                $scope.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Internet',

                    template: "No Internet connection"
                });

            }
            else {
               
            }

        }



    }

}])
.controller('managerolesCtrl', ['$scope', '$stateParams', 'BlankFactory', '$ionicPopup', '$ionicHistory', '$state', '$ionicModal',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, BlankFactory, $ionicPopup, $ionicHistory, $state, $ionicModal) {
    $scope.modal = $ionicModal.fromTemplateUrl('modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {

        $scope.modal.show();
        // console.log(a)

    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    $scope.rg = {
        role: "",
        description: ""
    }

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });

    $scope.$on('modal.removed', function () {
        // Execute action
    });
    $scope.modelpopup = function (data) {
        BlankFactory.getRoleById(data).then(function (res) {
            $scope.editlist = res;
            $scope.id = res.id;
            $scope.rg.role = res.name;
            $scope.rg.description = res.description;
            for (var i = 0; i < res.permissions.length; i++) {
                if (res.permissions.length > 0) {
                    $scope.order[res.permissions[i]] = true;
                    $scope.format();
                }
            }

        })

        $scope.openModal();
        // $scope.lists = data;

    }

    $scope.data = [];

    $scope.isChecked = false;
    $scope.selected = [];
    $scope.checkedOrNot = function (asset, isChecked, index) {
        if (isChecked) {
            $scope.selected.push(asset);
        } else {
            var _index = $scope.selected.indexOf(asset);
            $scope.selected.splice(_index, 1);
        }
    };
    $scope.order = {};
    $scope.format = function () {
        $scope.modifiedOrder = [];
        angular.forEach($scope.order, function (value, key) {
            if (value) {
                console.log(value);
                $scope.modifiedOrder.push(parseInt(key));
            }
        });
    }
    $scope.submit = function (res) {
        BlankFactory.addRoles(res, $scope.modifiedOrder).then(function (res) {
            if (res.data.msg == "Your Role Added successfully") {
                loadroles();
                $scope.closeModal();
            }


        })
    }
    function loadroles() {
        BlankFactory.getAllRoles().then(function (res) {
            $scope.roles = res;
        })
    }
    function loadnews() {
        BlankFactory.getNewsResult().then(function (res) {
            $scope.html = res;
        })
    }
    loadnews();
    loadroles();
    function loadchoices() {
        BlankFactory.getChoices().then(function (res) {
            $scope.assets = res;
        })
    }
    loadchoices();

    $scope.addRole = function () {
        $scope.form = "add";
        $scope.modal.show();
    }
    $scope.update = function (data) {
        BlankFactory.updateRoleById($scope.id, data, $scope.modifiedOrder).then(function (res) {
            if (res.msg == "Your Role Updated successfully") {
                loadroles();
                $scope.modal.hide();
            }

        })
    }
    $scope.delete = function (data) {
        var popup = $ionicModal.alert({

        })

        BlankFactory.deleRoleById(data).then(function () {
            var alertPopup = $ionicPopup.conform({
                title: 'Roles',

                template: res.data.msg
            });
        })
    }
}])
.controller('changepasswordCtrl', ['$scope', '$stateParams', 'BlankFactory', '$ionicPopup', '$ionicHistory', '$localStorage', '$state', '$ionicLoading',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, BlankFactory, $ionicPopup, $ionicHistory, $localStorage, $state, $ionicLoading) {
    $scope.show = function () {
        $ionicLoading.show({
            template: 'Loading...',
            duration: 3000
        }).then(function () {
            console.log("The loading indicator is now displayed");
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide().then(function () {
            console.log("The loading indicator is now hidden");
        });
    };
    $scope.rg = {

        oldpassword: "",
        newpassword: "",
        confirmpassword: ""
    }
    $scope.orig = angular.copy($scope.rg);
    $scope.reset = function () {
        $scope.rg = angular.copy($scope.orig);
    }
    $scope.submit = function (data) {
        $scope.show();
         if (data.newpassword === data.confirmpassword) {
                    BlankFactory.changePassword(data, $localStorage.userid).then(function (res) {
                        if (res.data.msg === "Invalid Password") {
                            $scope.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Change password',

                                template: res.data.msg
                            });
                        }
                        else if (res.data.msg === "Invalid Old Password") {
                            $scope.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Change password',

                                template: res.data.msg
                            });
                        }
                        else {
                            $scope.hide();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Change Password',

                                template: "Your Password changed successfully"
                            });
                            alertPopup.then(function (res) {
                                $state.go("menu.homeforlogin");
                                $scope.reset();
                            })

                        }

                    })
                }
                else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Change Password',

                        template: "password did not match"
                    });
                }
        if (window.Connection) {
            //  alert("rathna" + window.Connection)
            if (navigator.connection.type == Connection.NONE) {
                $scope.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Internet',

                    template: "No Internet connection"
                });

            }
            else {
              
            }

        }



    }

}])
 .controller('homeforloginCtrl', ['$scope', '$stateParams', 'BlankFactory', '$ionicPopup', '$ionicHistory', '$localStorage', '$state', '$rootScope', '$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, BlankFactory, $ionicPopup, $ionicHistory, $localStorage, $state, $rootScope, $http) {

    $rootScope.loginresult = $localStorage.loginresults;
    console.log("homeforloginCtrl........" + $rootScope.loginresult)
    $scope.login = function (data) {
        $state.go("menu.changepassword");
        //BlankFactory.changePassword(data,$localStorage).success(function (res) {
        //    if (res) {

        //    }

        //})

    }
    $scope.getMemberdetails = function () {
        $ionicHistory.clearCache().then(function () { $state.go("menu.myaccount"); });

    }
    $scope.getNews = function () {
        BlankFactory.getNews().then(function (res) {
            $rootScope.newsData = res.items;

            $state.go("menu.cart");

        }, function (msg) {
            //alert();
            $state.go("menu.cart");
        })
    }
    $scope.getNews2 = function () {
        BlankFactory.getNews().then(function (res) {
            $rootScope.newsData = res.items;
            $state.go("menu.events");

        }, function (msg) {
            //alert();
            $state.go("menu.cart");
        })
    }
    $scope.gotoWebsite = function () {
        BlankFactory.getwebsite($localStorage.userid, $localStorage.password).then(function (res) {
            if (res == "urlmsg") {
                window.open("http://apps.apbjpdata.org/", '_system');

            }

        })
    }
}])
.controller('homeCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$localStorage', '$rootScope', 'BlankFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicHistory, $localStorage, $rootScope, BlankFactory) {
    $rootScope.loginresult = 0;
    console.log($rootScope.loginresult);
    $scope.addMember = function () {
        $ionicHistory.clearCache().then(function () { $state.go('menu.registration') });

        $ionicHistory.nextViewOptions({
            disableBack: true
        });
    }

    $scope.getNews = function () {
        $state.go("menu.cart");
    }

    $scope.dhanushwebsite = function () {
        window.open("http://www.dhanushinfotech.com/Pages/index.htm", '_system');
    }
    $scope.login = function () {
        $state.go("menu.login");
    }
    // 
    //console.log("homectrllocal---" + $localStorage.userid);
    //$rootScope.loginresult = $localStorage.loginresults;
    //console.log($localStorage.loginresults+"localstorage")
    //console.log("homectrl" + $rootScope.loginresult);
}])
.controller('reportsCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$localStorage', '$rootScope', 'BlankFactory', '$ionicModal', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicHistory, $localStorage, $rootScope, BlankFactory, $ionicModal) {
    function loadhierarchylevels() {
        BlankFactory.getHierarchylevels().then(function (res) {
            $scope.comaignid = res[1].id;
            BlankFactory.getLoactions($scope.comaignid).then(function (res) {
                $scope.state = res[0].name;
                $scope.boothcode = res[0].ec_code;
                $scope.stateid = res[0].id;
                BlankFactory.getDistricts($scope.comaignid, $scope.stateid).then(function (res) {
                    $scope.district = res;
                    $scope.showassembly = 0;

                    $scope.boothcode = $scope.boothcode + res[0].ec_code;
                    $scope.districtid = res[0].hierarchy_level;

                })
            })
        })
    }
    function loaddistrict() {

    }
    //loadProofDetails();
    loadhierarchylevels();
    loaddistrict();
    // loadfunction();

    $scope.getAssembly = function (data) {
        BlankFactory.getAssembly(data.ditrict, $scope.districtid).then(function (res) {
            $scope.assemblies = res;
            $scope.showassembly = 1;
            $scope.showMandal = 0;
            $scope.showUpaMandal = 0;
            $scope.showBooth = 0;
            $scope.assemblieshid = res[0].hierarchy_level;
            getBWReports($scope.districtid);
        })
    }
    function getBWReports(id) {
        BlankFactory.getBWReports(id).then(function (res) {
            $scope.listview = res;
        })
    }
    $scope.getMandals = function (data) {
        BlankFactory.getMandals(data.assembly, $scope.assemblieshid).then(function (res) {
            $scope.mandals = res;
            $scope.showassembly = 1;
            $scope.showMandal = 0;
            $scope.showUpaMandal = 0;
            $scope.showBooth = 0;
            $scope.mandalid = res[0].hierarchy_level;
            getBWReports($scope.assemblieshid);
        })
    }
    $scope.getVillages = function (data) {
        BlankFactory.getVillages(data.mandal, $scope.mandalid).then(function (res) {
            $scope.villages = res;
            $scope.showUpaMandal = 1;
            $scope.showBoothnumber = 0;
            $scope.villageid = res[0].hierarchy_level;
            getBWReports($scope.mandalid);
        })
    }
    $scope.getBooths = function (data) {
        BlankFactory.getBooths(data.village, $scope.villageid).then(function (res) {
            $scope.booths = res;
            $scope.showBooth = 1;
            getBWReports($scope.villageid);

        })
    }
    $scope.getBoothNumber = function (data) {
        if (data.booths == "") {
            $scope.showBoothnumber = 1;
        }
        else {
            BlankFactory.getBoothNumber(data.booths).then(function (res) {
                // $scope.rg.boothNumber = res.booth_code;
                $scope.boothcode = data.booths;
                $scope.showBoothnumber = 1;
                getBWReports(data.booths);

            })
        }

    }
    $scope.modal = $ionicModal.fromTemplateUrl('modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {



        $scope.modal = modal;
    });
    $scope.openModal = function () {

        $scope.modal.show();
        // console.log(a)

    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });

    $scope.$on('modal.removed', function () {
        // Execute action
    });
    $scope.modelpopup = function (data) {
        $scope.openModal();
        $scope.lists = data;

    }
    $scope.listview = function (data) {
        alert();
        $scope.openModal();

    }
}])
.controller('superadminCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$localStorage', '$rootScope', 'BlankFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicHistory, $localStorage, $rootScope, BlankFactory) {
    $scope.GetReports = function () {
        $state.go("menu.reports");
    }
    $scope.addMember = function () {
        $state.go("menu.demo");
    }

    $scope.gotoWebsite = function () {
        BlankFactory.getwebsite($localStorage.userid, $localStorage.password).then(function (res) {
            if (res == "urlmsg") {
                window.location.href = 'http://apps.apbjpdata.org/';
                //window.open('http://188.42.96.92/', '_system');
                // var rf=  cordova.InAppBrowser.open('http://188.42.96.92/', "_system", "location=true");
                //ref.close();


            }

        })


    }
}])
 .controller('demoCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$localStorage', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicHistory, $localStorage, $rootScope) {
    $scope.GetReports = function () {
        $state.go("menu.reports");
    }
    $scope.addMember = function () {
        $state.go("menu.demo");
    }
}])

.controller('changemobilenumberCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$localStorage', '$rootScope','BlankFactory','$ionicPopup','$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicHistory, $localStorage, $rootScope, BlankFactory, $ionicPopup, $ionicLoading) {
    $scope.GetReports = function () {
        $state.go("menu.reports");
    }
    $scope.addMember = function () {
        $state.go("menu.demo");
    }
    $scope.show = function () {
        $ionicLoading.show({
            template: 'Loading...',
            duration: 3000
        }).then(function () {
            console.log("The loading indicator is now displayed");
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide().then(function () {
            console.log("The loading indicator is now hidden");
        });
    };
    function loaddata() {
        BlankFactory.getUserMobile($localStorage.userid).then(function (res) {
            $scope.user = res.data;
        })
    }
    loaddata()
    $scope.changeMobileNumber = function (data) {
        $scope.show();
        if (data.membershipID !== data.confirmmembershipID) {
            $scope.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Change Mobile Number',

                template: "Membership ID miss match,Please re-enter"
            });
        }
        else {
            if (data.mobileNumber != data.confirm_mobile_number) {
                $scope.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Change Mobile Number',

                    template: "Mobile Number miss match,Please re-enter"
                });
            }
            else {
                BlankFactory.changeMobileNumber(data, $localStorage.userid).then(function (res) {

                    if (res.data.msg == "Your profile have been updated") {
                        $scope.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Change Mobile Number',

                            template: "Your Profile updated successfully" + "<br>" + "username:" + res.data.username + "<br>" + "Password: " + res.data.password
                        });
                        alertPopup.then(function (res) {
                            if (res) {
                                $state.go("menu.homeforlogin");
                            }
                        })
                    }

                    if (res.data.membership_id == "Membership Id already registered") {
                        $scope.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Change Mobile Number',

                            template: "Make sure to get New Membership ID using your New Mobile No, by dialing 18002661001. Try again"
                        });
                    }
                    if (res.data.mobile_number == "Mobile Number already registered") {
                        $scope.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Change Mobile Number',

                            template: res.data.mobile_number[0]
                        });
                    }
                })
            }
        }
        if (window.Connection) {
            //  alert("rathna" + window.Connection)
            if (navigator.connection.type == Connection.NONE) {
                $scope.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Internet',

                    template: "No Internet connection"
                });

            }
            else {
               
            }

        }

        
       
    }
}])
.controller('eventsCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', '$localStorage', '$rootScope', 'BlankFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicHistory, $localStorage, $rootScope, BlankFactory) {
    $scope.flashNews = function () {
        BlankFactory.getflashNews().then(function (res) {
            $scope.flashnews = res;

        })

    }

    $scope.flashNews();
}])
.controller('menuCtrl', ['$scope', '$stateParams', '$ionicPopover', '$state', '$localStorage', '$rootScope', '$window', '$ionicHistory', '$templateCache', 'BlankFactory', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopover, $state, $localStorage, $rootScope, $window, $ionicHistory, $templateCache, BlankFactory, $ionicPopup) {
    $scope.popoverid = 0;
    // var popoverid = $localStorage.userid;
    //  console.log(popoverid);
    //$rootScope.loginresult = true;
    $scope.userid = $localStorage.userid;
    console.log($scope.userid);
    $rootScope.loginresult = 0;
    if ($scope.userid == undefined) {
        $rootScope.loginresult = 0;
        console.log($rootScope.loginresult);
    }
    else {
        $rootScope.loginresult = $localStorage.loginresults;
        console.log("rathna------------" + $rootScope.loginresult)
    }




    $scope.registration = function () {

        $ionicHistory.clearCache().then(function () { $state.go('menu.registration') });

    }


    $scope.loginpage = function () {
        $localStorage.loginresults = 0;
        $state.go("menu.login");
        $ionicHistory.nextViewOptions({
            disableBack: true
        });

    }
    $scope.logout = function () {
        $window.localStorage.clear();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $localStorage.$reset();
        $templateCache.removeAll();
        $scope.popoverid = 0;


        $localStorage.loginresults = 0;
        console.log("reddy--" + $localStorage.loginresults);
        $state.go("menu.home");
        $rootScope.loginresult = $localStorage.loginresults;
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
    }
    $scope.changePassword = function () {
        $state.go("menu.changepassword");

    }
    $scope.myAccount = function () {
        $state.go("menu.myaccount");

        $ionicHistory.nextViewOptions({
            disableBack: true
        });

    }
    $scope.getNews = function () {
        BlankFactory.getNews().then(function (res) {
            $rootScope.newsData = res;
            $state.go("menu.cart");

        })
    }
    $scope.changeMobileNumber = function () {
        $state.go("menu.changemobilenumber");
    }
}])
