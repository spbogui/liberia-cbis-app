var baseUrl;

var cbis = angular.module('cbis', ['ngRoute', 'ngResource', 'ui-notification', 'angularBootstrapNavTree', 'ngAnimate'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/CHA_HRF', {
            templateUrl: 'partials/CHA_Household_Registration_Form.html',
            controller: 'CHA_HRF'
        }).when('/CHA_MSR', {
            templateUrl: 'partials/CHA_Monthly_Service_Report.html',
            controller: 'CHA_MSR'
        }).when('/CHSS_MSR', {
            templateUrl: 'partials/CHSS_Monthly_Service_Report.html',
            controller: 'CHSS_MSR'
        }).when('/acceuil', {
            templateUrl: 'partials/acceuil.html'
        });

        $locationProvider.html5Mode(false).hashPrefix('!');

        $.ajax({
            url: 'manifest.webapp',
            async: false,
            cache: false,
            dataType: 'json'
        }).done(function (data) {
            baseUrl = data.activities.dhis.href;
        });
    }]);

cbis.run(['$rootScope', 'orgUnitResource', 'orgUnitLevel', '$location', '$window', '$filter', 'DataSetResource','DataElementResource', function ($rootScope, orgUnitResource, orgUnitLevel, $location, $window, $filter, DataSetResource,DataElementResource) {

    var orgUnitCollection = [], arrylong = 0, page = 1, pageCount = 0;
    var firstTimestamp;
    var dataMonthly = [{code: '01', name: 'Janvier'}, {code: '02', name: 'Fevrier'}, {code: '03', name: 'Mars'}, {code: '04', name: 'Avril'}, {code: '05', name: 'Mai'}, {code: '06', name: 'Juin'}, {code: '07', name: 'Juillet'}, {code: '08', name: 'Aout'}, {code: '09', name: 'Septembre'}, {code: '10', name: 'Octobre'}, {
        code: '11',
        name: 'Novembre'}, {code: '12', name: 'Decembre'}];
    //var dataYearly = [{code: '', name: 'Janvier - Decembre'}];
    var dataYearly = [{code: '', name: ''}];
    var dataSetAttendu = [ {code: 'CHA_RF'},{code: 'CHA_HRF'},{code: 'CHA_MSR'},{code: 'HRF'},{code: 'CHSS_MSR'},{code: 'C_HRF'}]
    var notreAnnee = new Date();
    notreAnnee = $filter('date')(notreAnnee, 'yyyy');
    notreAnnee = parseInt(notreAnnee);
    var compte = 0,compter = 0, comptePageCount = 0, DataSet =[];
    $rootScope.datasetSelected = {};
    $rootScope.arbre = [];
    $rootScope.allOrgUnit = [];
    $rootScope.OrgUnitGroup = [];
    $rootScope.tousDataSets = [];
    $rootScope.niveauOrgUnit;
    $rootScope.loadingOrgUnits = true;

    getOrgUnitLevel();
    getDataSet();

    function getOrgUnitLevel() {
        console.log("lancement de collecte des orgUnit");
        firstTimestamp = new Date().getTime();
        orgUnitLevel.get({
            paging: false,
            fields: 'id,name,level'
        }, function (data) {
            $rootScope.niveauOrgUnit = data.organisationUnitLevels;
            getOrgUnit();
        }, function () {
        });
    }

    function getOrgUnit() {
        orgUnitResource.query({
            paging: false,
            fields: 'id,name,shortName,parent,level,dataSets'
        }, function (data) {
            var secondTimestamp = new Date().getTime();
            console.log("temps d'execution = " + (secondTimestamp - firstTimestamp) + " millisecondes");
            $rootScope.allOrgUnit = data.organisationUnits;
            dataArbre();
        }, function (err) {
            getOrgUnitDetail();
        });
    }

    function getOrgUnitDetail() {
        //console.log("entrer dans getOrgUnitDetail()")
        orgUnitResource.query({
            pageSize: 300,
            fields: 'id,name,shortName,parent,level'
        }, function (data) {
            $rootScope.allOrgUnit = [];
            if (data.pager.pageCount) {
                page = 1;
                pageCount = data.pager.pageCount;
                console.log("pageCount = " + pageCount);
                $rootScope.allOrgUnit = data.organisationUnits;
                $rootScope.nbreTelecharger = 1;
                $rootScope.nbreTotal = pageCount;
                if (pageCount > page) {
                    page++;
                    getOrgUnitID();
                }
            }
        }, function (err) {

        });
    }

    function getOrgUnitID() {
        console.log("entrer dans getOrgUnitID()");
        orgUnitResource.query({
            page: page,
            pageSize: 300,
            fields: 'id,name,shortName,parent,level'
        }, function (data) {
            var tempo = [];
            tempo = angular.copy($rootScope.allOrgUnit);
            $rootScope.allOrgUnit = tempo.concat(data.organisationUnits);
            if (pageCount > page) {
                page++;
                $rootScope.nbreTelecharger++;
                getOrgUnitID();
            } else {
                var secondTimestamp = new Date().getTime();
                console.log("temps d'execution long= " + (secondTimestamp - firstTimestamp) + " millisecondes");
                console.log("fin de collect orgUnits dans getOrgUnitID()");
                //console.log($rootScope.allOrgUnit);
                dataArbre();
            }
        }, function (err) {
            //compte++;
            //if(compte<$rootScope.allOrgUnit.length){getOrgUnitID();}else{compte=0;dataArbre();}
        });
    }


    /*Preparation à la construction de l'arborescence. constitution d'un tableau les unité d'organisation  par nivo*/
    function dataArbre() {
        var nivoReel = [];
        /*ordonner par niveau*/
        $rootScope.niveauOrgUnit.sort(function (a, b) {
            if (a.level > b.level)
                return 1;
            if (a.level < b.level)
                return -1;
            return 0;
        });

        /* constitution des niveaux*/
        for (var i = 0, j = $rootScope.niveauOrgUnit.length; i < j; i++) {
            var tmp = {
                level: $rootScope.niveauOrgUnit[i].level,
                orgUnits: []
            };
            orgUnitCollection[i] = tmp;
        }

        /*remplissage par nivo*/
        for (var i = 0, j = $rootScope.allOrgUnit.length; i < j; i++) {
            var tp = $rootScope.allOrgUnit[i].level;
            if (nivoReel.indexOf(tp) == -1) {
                nivoReel.push(tp);
            }
            tp--;
            $rootScope.allOrgUnit[i].nomNiveau = $rootScope.niveauOrgUnit[tp].name;
            orgUnitCollection[tp].orgUnits.push($rootScope.allOrgUnit[i]);
        }
        /*trie des unités par ordre alphabetique*/
        for (var i = 0, j = orgUnitCollection.length; i < j; i++) {
            orgUnitCollection[i].orgUnits.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
        }
        $rootScope.OrgUnitGroup = angular.copy(orgUnitCollection);
        var testont = orgUnitCollection.length;
        arrylong = angular.copy(testont);
        arrylong -= 1;
        /*console.log("nivoReel =");
         console.log(nivoReel);
         console.log("orgUnitCollection =");
         console.log(orgUnitCollection);*/
        if (nivoReel.length == orgUnitCollection.length) {
            arbreRecursive(orgUnitCollection.length - 1);
        } else {
            arrylong = angular.copy(nivoReel.length);
            arrylong -= 1;
            arbreRecursive(nivoReel.length - 1);
        }


    }

    /*contitution de l'hierachie des unités d'organisations*/
    function arbreRecursive(nivo) {
        /*console.log("entrer dans arbreRecursive");
         console.log("nivo = " + nivo);*/
        var temptout = [];
        var nivoSup = nivo - 1;
        for (var i = 0, j = orgUnitCollection[nivoSup].orgUnits.length; i < j; i++) {
            var tempS = {};
            tempS.data = {};
            tempS.children = [];
            tempS.label = orgUnitCollection[nivoSup].orgUnits[i].name;
            tempS.id = orgUnitCollection[nivoSup].orgUnits[i].id;
            tempS.data = orgUnitCollection[nivoSup].orgUnits[i];
            var aDelete = [];
            var continu = true;
            var a = 0;
            while (continu) {
                if (arrylong == nivo) {
                    //console.log("nivo = "+nivo+"; a = "+a);
                    //console.log(orgUnitCollection);
                    if (orgUnitCollection[nivoSup].orgUnits[i].id == orgUnitCollection[nivo].orgUnits[a].parent.id) {
                        var temp = {};
                        temp.data = {};
                        temp.children = [];
                        temp.label = orgUnitCollection[nivo].orgUnits[a].name;
                        temp.id = orgUnitCollection[nivo].orgUnits[a].id;
                        temp.data = orgUnitCollection[nivo].orgUnits[a];
                        tempS.children.push(temp);
                        orgUnitCollection[nivo].orgUnits.splice(a, 1);
                        a--;
                    }
                } else {
                    if (orgUnitCollection[nivo].orgUnits.length == 0) {
                        break;
                    }
                    // console.log("***** nivo = "+nivo+"; a = "+a);
                    // console.log(orgUnitCollection);
                    if (orgUnitCollection[nivoSup].orgUnits[i].id == orgUnitCollection[nivo].orgUnits[a].data.parent.id) {
                        var temp = {};
                        temp.data = {};
                        temp.children = [];
                        temp.label = orgUnitCollection[nivo].orgUnits[a].label;
                        temp.id = orgUnitCollection[nivo].orgUnits[a].id;
                        temp.data = orgUnitCollection[nivo].orgUnits[a].data;
                        temp.children = orgUnitCollection[nivo].orgUnits[a].children;
                        tempS.children.push(temp);
                        orgUnitCollection[nivo].orgUnits.splice(a, 1);
                        a--;
                    }

                }
                a++;
                if (a == orgUnitCollection[nivo].orgUnits.length) {
                    continu = false;
                }
            }
            temptout.push(tempS);
        }
        orgUnitCollection[nivoSup].orgUnits = temptout;
        if (nivo != 1) {
            arbreRecursive(nivoSup);
        } else {
            $rootScope.arbre = orgUnitCollection[0].orgUnits;
            $rootScope.loadingOrgUnits = false;
            console.log("fin de constitution de l'arbre");
        }
    }

    $rootScope.goAccueil = function () {
        $window.location.href = baseUrl;
    }

    $rootScope.my_tree_handler = function (branche) {
        console.log("entrer dans my_tree_handler");
        console.log(branche);
        //console.log(branche.data);
        if ($rootScope.orgUnitSelectedId != branche.data.id) {
            $location.path('acceuil');
            $rootScope.dataSetID = {};
            $rootScope.periode = "";
            $rootScope.orgUnitSelected = branche.data.name;
            $rootScope.orgUnitSelectedId = branche.data.id;
            console.log("orgUnitSelectedId = " + $rootScope.orgUnitSelectedId);

            if (branche.data.dataSets) {
                displayDataSetName(branche.data.dataSets)
            }
        }


    }

    function PeriodeType(typePeriode) {
        //$scope.typePeriode = "";
        console.log("typePeriode =  " + typePeriode);
        if (typePeriode == 'Monthly') {
            DataPeriode = angular.copy(dataMonthly);
        }
        if (typePeriode == 'Quarterly') {
            DataPeriode = angular.copy(dataQuarterly);
        }
        if (typePeriode == 'SixMonthly') {
            DataPeriode = angular.copy(dataSixMonthly);
        }
        if (typePeriode == 'Yearly') {
            DataPeriode = angular.copy(dataYearly);
        }
        formaterPeriod();
    }

    function formaterPeriod() {
        console.log("entrer dans formaterPeriode");
        $rootScope.collectePeriode = [];
        for (var i = 0, j = DataPeriode.length; i < j; i++) {
            var temp = {};
            temp.code = notreAnnee + DataPeriode[i].code;
            temp.name = DataPeriode[i].name + " " + notreAnnee;
            $rootScope.collectePeriode.push(temp);
        }
        console.log("collectePeriode");
        console.log($rootScope.collectePeriode);
    }

    $rootScope.anneePrecedente = function () {
        console.log("entrer dans anneePrecedente");
        notreAnnee -= 1;
        formaterPeriod();
    }

    $rootScope.anneeSuivante = function () {
        console.log("entrer dans anneeSuivante");
        notreAnnee += 1;
        formaterPeriod();
    }

    function getDataSet() {
        console.log("entrer dans getDataSet");
        DataSetResource.query({
            paging: false,
            fields: 'id,name,timelyDays,periodType,code'
        }, function (resultat) {
            nosDataSets(resultat.dataSets);
        }, function (err) {
            compte = 1;
            getDataSetDetail();
        });
    }

    function getDataSetDetail() {
        console.log("entrer dans getDataSetDetail");
        DataSetResource.query({
            fields: 'id,name,timelyDays,periodType,code'
        }, function (resultat) {
            DataSet = resultat.dataSets;
            comptePageCount = resultat.pager.pageCount;
            if (compte < comptePageCount) {
                compte++;
                getDataSetDetailAll();
            }
        }, function (err) {

        });
    }

    function getDataSetDetailAll() {
        console.log("entrer dans getDataSetDetailAll");
        DataSetResource.query({
            paging: compte,
            fields: 'id,name,timelyDays,periodType,code'
        }, function (resultat) {
            var tempo1 = [], tempo2 = [];
            tempo1 = angular.copy(allDataSet);
            tempo2 = resultat.dataSets;
            DataSet = tempo1.concat(tempo2);
            if (compte < comptePageCount) {
                compte++;
                getDataSetDetailAll();
            } else {
                nosDataSets(resultat.dataSets);
            }
        }, function (err) {

        });
    }

    function nosDataSets(dataSetAll) {
       var a = 0, conti = true, trouve = false;
        while (conti) {
            for (var i = 0, j = dataSetAll.length; i < j; i++) {
                if (dataSetAll[i].code == dataSetAttendu[a].code) {
                    dataSetAttendu[a] = dataSetAll[i];
                    trouve = true;
                    break;
                }
            }
            if(!trouve){
                dataSetAttendu.splice(a,1);
                a--;
            }else{
                trouve = false;
            }
            a++;
            if(dataSetAttendu.length == a){
                conti = false;
            }
        }
        //$rootScope.tousDataSets = angular.copy(dataSetAttendu);
        if(dataSetAttendu.length > 0){
            console.log("vers dans getDataElements ======>");
            console.log(dataSetAttendu);
            compte = 0;
            getDataElements();
        }
        
    }

    function getDataElements() {
        console.log("entrer dans getDataElements");
        DataSetResource.query({
            id: dataSetAttendu[compte].id,
            fields: 'dataSetElements'
        }, function (resultat) {
            console.log("resultat dataSetElements");
            console.log(resultat.dataSetElements);
            dataSetAttendu[compte].dataElement = resultat.dataSetElements;
            console.log("dataElement");
            console.log(angular.copy(dataSetAttendu));
            compte++;
            if(compte<dataSetAttendu.length){
                getDataElements();
            }else{
                compte = 0;
                dataElementsId();
            }
            
        }, function (err) {
        });
    }

    function dataElementsId() {
        console.log("entrer dans dataElementsId");
        for(var i=0,j=dataSetAttendu[compte].dataElement.length;i<j;i++){
            dataSetAttendu[compte].dataElement[i] = dataSetAttendu[compte].dataElement[i].dataElement;
        }
        console.log("dataSetAttendu Fin");
        console.log(angular.copy(dataSetAttendu));
        compte++;
        if(compte<dataSetAttendu.length){
            dataElementsId();
        }else{
            compte = 0;
            compter = 0;
            dataElementsCode();
        }
        
        
    }

    function dataElementsCode() {
        console.log("entrer dans dataElementsCode");
        DataElementResource.query({
            id: dataSetAttendu[compte].dataElement[compter].id,
            fields: 'code'
        }, function (resultat) {
            dataSetAttendu[compte].dataElement[compter].code = resultat.code;
            compter++;
            if(compter < dataSetAttendu[compte].dataElement.length){
                dataElementsCode();
            }else{
                compte++;
                if(compte < dataSetAttendu.length){
                    compter = 0;
                    dataElementsCode();
                }else{
                    $rootScope.tousDataSets = angular.copy(dataSetAttendu);
                    console.log("dataSetAttendu dataElementsCode");
                    console.log(angular.copy(dataSetAttendu));
                }
            }
        }, function (err) {
            alert("erreur dans dataElementsCode");
        });
    }
    
    function displayDataSetName(data) {
        var temp = [];
        for (var k = 0, l = dataSetAttendu.length; k < l; k++) {
            for (var i = 0, j = data.length; i < j; i++) {
                if (data[i].id == dataSetAttendu[k].id) {
                    temp.push(dataSetAttendu[k]);
                    break;
                }
            }
        }
        $rootScope.lesDataSets = temp;
        console.log("$rootScope.lesDataSets");
        console.log($rootScope.lesDataSets);
    }

    $rootScope.executerPeriod = function (dataId) {
        console.log("dataId = " + dataId);
        $location.path('acceuil');
        //console.log(dataId);
        $rootScope.periode = dataId;
        for (var i = 0, j = $rootScope.lesDataSets.length; i < j; i++) {
            if (dataId == $rootScope.lesDataSets[i].id) {
                $rootScope.datasetSelected = $rootScope.lesDataSets[i];
                break;
            }
        }

        PeriodeType($rootScope.datasetSelected.periodType);

    }

    $rootScope.lanceForm = function (period) {
        console.log("period = " + period);
        $location.path('acceuil');
        if (period) {
            console.log("datasetSelected");
            console.log($rootScope.datasetSelected);
            if ($rootScope.datasetSelected.code == "CHA_HRF") {
                $location.path('CHA_HRF');
            }
            if ($rootScope.datasetSelected.code == "CHA_MSR") {
                $location.path('CHA_MSR');
            }
            if ($rootScope.datasetSelected.code == "CHSS_MSR") {
                $location.path('CHSS_MSR');
            }

        }

    }

}]);
