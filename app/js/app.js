var baseUrl;

var cbis = angular.module('cbis', ['ngRoute', 'ngResource', 'ui-notification', 'angularBootstrapNavTree', 'ngAnimate'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/CHA_HRF', {
            templateUrl: 'partials/CHA_Household_Report_Form.html',
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

cbis.run(['$rootScope', 'orgUnitResource', 'orgUnitLevel', '$location', '$window', '$filter', 'DataSetResource','DataElementResource','me','$timeout', function ($rootScope, orgUnitResource, orgUnitLevel, $location, $window, $filter, DataSetResource,DataElementResource,me,$timeout) {

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
    var compte = 0,compter = 0, comptePageCount = 0, DataSet =[],meOrgUnit = [],mesNiveau = {};
    var MesOrgUnit = [], lonGroup = 0, typeAppel = "charge",lesChildren = [];
    $rootScope.datasetSelected = {};
    $rootScope.arbre = [];
    $rootScope.allOrgUnit = [];
    $rootScope.OrgUnitGroup = [];
    $rootScope.tousDataSets = [];
    $rootScope.niveauOrgUnit;
    $rootScope.loadingOrgUnits = true;

    
    userMe();
    //getDataSet();

    function userMe() {
        console.log("entrer dans userMe");
        me.query({
            //id : 'organisationUnits'
        }, function (data) {
            /*console.log("resultat UnserMe");
            console.log(data);
            console.log("organisation");
            console.log(data.organisationUnits);*/
            meOrgUnit = data.organisationUnits;
            /*console.log("meOrgUnit <<<<");
            console.log(meOrgUnit);*/
            for(var i = 0,j= meOrgUnit.length;i<j;i++){
                meOrgUnit[i].positionArbre = ""+i;
            }
            compte = 0;
            getMeOrgUnits();
        }, function () {
        });
    }
    
    function getMeOrgUnits() {
        console.log("entrer dans getMeOrgUnits");
        orgUnitResource.query({
            id : meOrgUnit[compte].id,
            fields: 'id,name,shortName,parent,children,level,dataSets'
        }, function (data) {
            /*console.log("resultat data");
            console.log(data);*/
            var temp = {};
            temp.children = [];
            temp.children = data.children;
            temp.dataSets = data.dataSets;
            temp.id = data.id;
            temp.level = data.level;
            temp.name = data.name;
            temp.label = data.name;
            temp.shortName = data.shortName;
            temp.positionArbre = meOrgUnit[compte].positionArbre;
            
            //meOrgUnit.push(temp);
            meOrgUnit[compte] = temp;
            compte++;
            if(compte < meOrgUnit.length){
                getMeOrgUnits();
            }else{
                if(typeAppel == "charge"){
                    grouperParNivo(angular.copy(meOrgUnit));
                }else{
                    addChildren(angular.copy(meOrgUnit));
                }

            }
        }, function (err) {
            
        });
    }
    
    function ordreAlphabetique(meOrg) {
        console.log("entrer dans ordreAlphabetique");
        for (var i = 0, j = meOrg.length; i < j; i++) {
            meOrg.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
        }
        return meOrg;
        
    }
    
    function grouperParNivo(meOrg) {
        console.log("entrer dans grouperParNivo");
        //console.log("meOrg");
        //console.log(meOrg);
        meOrg = ordreAlphabetique(meOrg);
        meOrgUnit = [];
        for(var i = 0,j=meOrg.length;i<j;i++){
            if(meOrg[i].children && meOrg[i].children.length > 0){
                for(var k=0,l=meOrg[i].children.length;k<l;k++){
                    meOrg[i].children[k].positionArbre = ""+meOrg[i].positionArbre+""+k;
                    meOrgUnit.push(meOrg[i].children[k]);
                }
                meOrg[i].children = [];
            }
        }
        var temp = {};
        temp.level = meOrg[0].level;
        temp.orgUnits = meOrg;
        MesOrgUnit[lonGroup] = temp;

        if (meOrgUnit.length > 0) {
            lonGroup++;
            if (lonGroup < 3) {
                compte = 0;
                getMeOrgUnits();
            }else{
                var tmp2 = {};
                tmp2.orgUnits = meOrgUnit;
                MesOrgUnit[lonGroup] = tmp2;
                bienVoirArbre();
            }
        } else {
            //console.log("MesOrgUnit par sortir");
            bienVoirArbre();
        }
        
    }
    
    function bienVoirArbre() {
        console.log("enstrer dans bienVoirArbre");
        /*console.log("MesOrgUnit");
        console.log(MesOrgUnit);*/
        var niv = MesOrgUnit.length;
        if(niv > 1){
            construireArbreRecursive(niv-1);
        }else{
            affichageOrgUnit();
        }
        
    }

    function construireArbreRecursive(nivo) {
        console.log("entrer dans construireArbreRecursive");
        var long = MesOrgUnit[nivo].orgUnits.length;
        var nivoSup = nivo-1;
        //console.log("debut long = "+long);
        while(long != 0){
            var indice = MesOrgUnit[nivo].orgUnits[0].positionArbre.substr(0, nivo);
            //console.log("indice = "+indice+"; nivo = "+nivo);
            for(var i=0,j=MesOrgUnit[nivoSup].orgUnits.length;i<j;i++){
                if(indice == MesOrgUnit[nivoSup].orgUnits[i].positionArbre){
                    MesOrgUnit[nivoSup].orgUnits[i].children.push(MesOrgUnit[nivo].orgUnits[0]);
                    break;
                }
            }
            MesOrgUnit[nivo].orgUnits.splice(0,1);
            long--;
            //console.log("fin long = "+long);
        }
        if(nivo != 1){
            construireArbreRecursive(nivo-1);
        }else{
            affichageOrgUnit();
        }
        
    }
    
    function affichageOrgUnit() {
        console.log("entrer dans affichageOrgUnit");
        /*console.log("MesOrgUnit");
        console.log(MesOrgUnit);*/
        $rootScope.arbre = MesOrgUnit[0].orgUnits;
        /*console.log("$rootScope.arbre");
        console.log($rootScope.arbre);*/
        $rootScope.loadingOrgUnits = false;
        getDataSet();
    }

    $rootScope.goAccueil = function () {
        $window.location.href = baseUrl;
    }

    $rootScope.my_tree_handler = function (branche) {
        console.log("entrer dans my_tree_handler");
        console.log(branche);

            if(branche.children.length > 0){
                if(branche.children[0].label){
                    console.log("le label existe");
                }else{
                    console.log("label inexistant++++++");
                    lesChildren = branche.children;
                    meOrgUnit = angular.copy(lesChildren);
                    compte = 0;
                    typeAppel = "children";
                    getMeOrgUnits();
                }
                
           }else{
               console.log("pas de children")
            }

        if ($rootScope.orgUnitSelectedId != branche.id) {
            $location.path('acceuil');
            $rootScope.dataSetID = {};
            $rootScope.periode = "";
            $rootScope.orgUnitSelected = branche.name;
            $rootScope.orgUnitSelectedId = branche.id;
            console.log("orgUnitSelectedId = " + $rootScope.orgUnitSelectedId);

            if (branche.dataSets) {
                displayDataSetName(branche.dataSets);
            }
        }

    }

    function addChildren(meOrg) {
        console.log("entrer dans addChildren");
        //console.log(angular.copy(meOrg));
        meOrg = ordreAlphabetique(meOrg);

        for(var i = 0,j=meOrg.length;i<j;i++){
            if(meOrg[i].children && meOrg[i].children.length > 0){
                for(var k=0,l=meOrg[i].children.length;k<l;k++){
                    meOrg[i].children[k].positionArbre = ""+meOrg[i].positionArbre+""+k;
                    meOrgUnit.push(meOrg[i].children[k]);
                }
                //meOrg[i].children = [];
            }
        }
        lesChildren = angular.copy(meOrg);
       /* console.log("lesChildren =====");
        console.log(lesChildren);
        console.log("$rootScope.arbre");
        console.log($rootScope.arbre);*/
        var posi = lesChildren[0].positionArbre;
        /*console.log("posi ====== "+angular.copy(posi)+" // posi.length = "+posi.length);
        console.log("//////////////////////////////////////////////////////");*/
        posi = posi.substr(0,posi.length-1);
        var posiArbre = $rootScope.arbre[0].positionArbre.length;
        var posiActu = posi.substr(0,posiArbre);
        //console.log("$rootScope.arbre[0].positionArbre = "+$rootScope.arbre[0].positionArbre+" # posiArbre = "+posiArbre+" # posi = "+posi+" # posiActu = "+posiActu);
        for(var ab =0,bb=$rootScope.arbre.length;ab<bb;ab++){
            if($rootScope.arbre[ab].positionArbre == posiActu){
                if($rootScope.arbre[ab].positionArbre == posi){
                    $rootScope.arbre[ab].children = lesChildren;
                }else{
                    //$rootScope.arbre[ab].children = ajouterArbre($rootScope.arbre[ab].children,posi);
                    ajouterArbre($rootScope.arbre[ab].children,posi);
                }
            }
        }
        /*console.log("$rootScope.arbre");
        console.log($rootScope.arbre);*/
    }
    
    function ajouterArbre(arbre,posi) {
        console.log("entrer dans ajouterArbre");
        var posiArbre = arbre[0].positionArbre.length;
        var posiActu = posi.substr(0,posiArbre);
        //console.log("arbre[0].positionArbre = "+arbre[0].positionArbre+" # posiArbre = "+posiArbre+" # posi = "+posi+" # posiActu = "+posiActu);
        for(var ab =0,bb=arbre.length;ab<bb;ab++){
            if(arbre[ab].positionArbre == posiActu){
                if(arbre[ab].positionArbre == posi){
                   // console.log("!!!!!!!!!!! trouvééééééééé !!!!!!!!!!!!");
                    arbre[ab].children = lesChildren;
                    /*return arbre[ab].children;
                    console.log("arbre[ab]");
                    console.log(arbre[ab]);
                    console.log("lesChildren");
                    console.log(lesChildren);*/
                }else{
                    //arbre[ab].children = ajouterArbre(arbre[ab].children,posi);
                    ajouterArbre(arbre[ab].children,posi);
                }
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

    function finChargementArbre() {
        getDataSet();
    }

}]);
