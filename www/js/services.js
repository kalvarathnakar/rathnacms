angular.module('app.services', [])

.factory('BlankFactory', ['$http', 'Upload', '$q', function ($http, Upload, $q, $scope) {
   // var apiUrl = "http://10.10.11.227:8000/services/";
    //var apiUrl = "http://10.10.11.210:8001/services/";
    //var apiUrl = "http://10.10.11.222:8000/services/"; //membership / changepasswordhttp://188.42.96.92/
   //var apiUrl = "http://202.153.34.166:8001/services/";
   var apiUrl = "http://188.42.96.92/services/";
   var apiurl2 = "http://188.42.96.92/";
 // var apiurl2 = "http://202.153.34.166:8001/";
    return {
        //BW---booth worker
        getIdProofDetails: function () {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "idproof/choices")
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getwebsite: function (id,password) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiurl2+"accounts/login/lau/" + id + "/" + password)
                .then(function (response) {
                    if (response.data == 'urlmsg') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getNews: function () {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get("https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.bjp.org%2F%3Foption%3Dcom_ninjarsssyndicator%26feed_id%3D1%26format%3Draw")
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },

        getflashNews: function () {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "flashnews")
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getAllRoles: function () {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "admin/roles/all")
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getAllCast: function () {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "cast/choices")
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        deleteRoleById: function (id) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "admin/roles/delete/" + id)
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getRoleById: function (id) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "admin/roles/view/"+id)
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        updateRoleById: function (id, data, permission) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.post(apiUrl + "admin/roles/view/" + id, {"id":id,"name":data.role,"description":data.description,"permissions":permission})
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getNewsResult: function () {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get("http://vsktelangana.org/wp-json/wp/v2/posts/")
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getChoices: function () {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "admin/roles/choices")
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        addRoles: function (data,permission) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.post(apiUrl + "admin/roles/add", { "name": data.role, "description": data.description, "permissions": permission })
            .then(function (response) {
                if (typeof response.data === 'object') {
                    return response;
                } else {
                    // invalid response
                    return $q.reject(response);
                }

            }, function (response) {
                // something went wrong
                return $q.reject(response);
            });
        },
        getBWReports: function (id) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "locations/membership/view/" + id)
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },

        getParentId: function (id) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "locations/parent/" + id)
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },

        getHierarchylevels: function () {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "hierarchylevels/view/1")
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getLoactions: function (sid) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "locations/view/1/" + sid)
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getParliament: function () {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "parliamentlist")
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },

        getDistricts: function (sid, did) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "locations/view/1/" + sid + "/" + did)
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getAssembly: function (did, hid) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "locations/view/1/" + hid + "/" + did)
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getMandals: function (aid, hid) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "locations/view/1/" + hid + "/" + aid)
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getVillages: function (aid, hid) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "locations/view/1/" + hid + "/" + aid)
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getBooths: function (aid, hid) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "locations/view/1/" + hid + "/" + aid)
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getBoothNumber: function (hid) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "locations/buildbooth/" + hid)
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        getUserDetails: function (userid) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "membership/view/" + userid)
                .then(function (response) {
                    if (typeof response.data === 'object') {

                        return response.data;

                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        },
        addMember: function (user,  f, boothcode) {
            var da = { "name": user.name, "surname": user.surname, "gender": user.gender, "usercategory_id": user.caste, "mobile_number": parseInt(user.mobileNumber), "booth_id": boothcode, "age": user.age, "graduate": user.graduate, "idproof_id": user.idproof, "confirm_membership_id": user.confirmmembershipID, "confirm_mobile_number": user.confirm_mobile_number, "idproof_number": user.IDproofNumber, "membership_id": parseInt(user.membershipID), "photo": f };
            
            return Upload.upload({
                url: apiUrl + 'membership/add',
                data: da
                //headers: {
                //    "Content-Type": "application/json"
                //}

            });
            //console.log("test" + test);
            //return test;
        },
        updateMember: function (user, f, id, boothcode) {
            var da = { "uid": id, "name": user.name, "booth_id": boothcode, "surname": user.surname, "mobile_number": parseInt(user.mobileNumber), "gender": user.gender, "usercategory_id": user.caste, "age": user.age, "idproof_id": user.idproof, "graduate": user.graduate, "confirm_membership_id": user.confirmmembershipID, "idproof_number": user.IDproofNumber, "confirm_mobile_number": user.confirm_mobile_number, "membership_id": parseInt(user.membershipID), "photo": f };

            return Upload.upload({
                url: apiUrl + 'membership/update',
                data: da
                //headers: {
                //    "Content-Type": "application/json"
                //}

            });
            //console.log("test" + test);
            //return test;
        },
        isLogin: function (user) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.post(apiUrl + "login", { "username": user.username, "password": user.password })
            .then(function (response) {
                if (typeof response.data === 'object') {
                    return response;
                } else {
                    // invalid response
                    return $q.reject(response);
                }

            }, function (response) {
                // something went wrong
                return $q.reject(response);
            });
        },
        changePassword: function (user, userid) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.post(apiUrl + "membership/changepassword", { "uid": userid, "old_password": user.oldpassword, "new_password": user.newpassword })
            .then(function (response) {
                if (typeof response.data === 'object') {
                    return response;
                } else {
                    // invalid response
                    return $q.reject(response);
                }

            }, function (response) {
                // something went wrong
                return $q.reject(response);
            });
        },


        changeMobileNumber: function (user, userid) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.post(apiUrl + "change_mobilenumber/" + userid, { "membership_id": user.membershipID, "confirm_membership_id": user.confirmmembershipID, "mobile_number": user.mobileNumber, "confirm_mobile_number": user.confirm_mobile_number })
            .then(function (response) {
                if (typeof response.data === 'object') {
                    return response;
                } else {
                    // invalid response
                    return $q.reject(response);
                }

            }, function (response) {
                // something went wrong
                return $q.reject(response);
            });
        },
        getUserMobile: function (user) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get(apiUrl + "change_mobilenumber/" + user)
            .then(function (response) {
                if (typeof response.data === 'object') {
                    return response;
                } else {
                    // invalid response
                    return $q.reject(response);
                }

            }, function (response) {
                // something went wrong
                return $q.reject(response);
            });
        },
        getPassword: function (user) {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.post(apiUrl + "forgotpassword", { "username": user.name })
            .then(function (response) {
                if (typeof response.data === 'object') {
                    return response;
                } else {
                    // invalid response
                    return $q.reject(response);
                }

            }, function (response) {
                // something went wrong
                return $q.reject(response);
            });
        },


    };

}])

.service('BlankService', [function () {

}]);