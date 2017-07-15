cbis.controller('CHSS_MSR', ['$scope', '$rootScope','DataSetResource','dataValueSetsResource','DataElementResource','orgUnitResource','dataValueSetsResourceEdit',
    function ($scope, $rootScope, DataSetResource,dataValueSetsResource,DataElementResource,orgUnitResource,dataValueSetsResourceEdit) {

        var compte = 0, dataValueGet = [],getdata = {};
        var children = [], id_cha, childrenComplete = [];
        var parent={},notreDataset = {}, notreOrgUnitId, notrePeriode;

        notreDataset = angular.copy($rootScope.datasetSelected);
        notreOrgUnitId = angular.copy($rootScope.orgUnitSelectedId);
        notrePeriode = angular.copy($rootScope.periode);

        if(notreDataset.id && notrePeriode && notreOrgUnitId){
            enteteGetValue();
            getChildren();
        }


        function enteteGetValue() {
            getdata = {};
            getdata.dataSet = $rootScope.datasetSelected.id;
            getdata.completeData = new Date();
            getdata.period = $rootScope.periode;
            getdata.orgUnit = $rootScope.orgUnitSelectedId;
            getdata.dataValues = [];
        }
        
        function getDataElements() {
            console.log("entrer dans getDataElements");
            DataSetResource.query({
                id: $rootScope.datasetSelected.id,
                fields: 'dataSetElements'
            }, function (resultat) {
                console.log("resultat dataSetElements");
                console.log(resultat.dataSetElements);
                dataElement = resultat.dataSetElements;
                console.log("dataElement");
                console.log(angular.copy(dataElement));
                dataElementsId();
            }, function (err) {
            });
        }

        function dataElementsId() {
            console.log("entrer dans dataElementsId");
            for(var i=0,j=dataElement.length;i<j;i++){
                dataElement[i] = dataElement[i].dataElement;
            }
            console.log("dataElement Fin");
            console.log(angular.copy(dataElement));
            compte = 0;
            dataElementsCode();
        }

        function dataElementsCode() {
            console.log("entrer dans dataElementsCode");
            DataElementResource.query({
                id: dataElement[compte].id,
                fields: 'code'
            }, function (resultat) {
                dataElement[compte].code = resultat.code;
                compte++;
                if(compte < dataElement.length){dataElementsCode();
                }else{
                    getDataValue();
                }
            }, function (err) {
                alert("erreur dans dataElementsCode");
            });
        }

        function getDataValue() {
            console.log("entrer dans getDataValue");
            dataValueSetsResource.query({
                dataSet: $rootScope.datasetSelected.id,
                period: $rootScope.periode,
                orgUnit: $rootScope.orgUnitSelectedId
            }, function (resultat) {
                console.log("resultat");
                console.log(resultat);
                dataValueGet = resultat.dataValues;
                console.log("dataValueGet");
                console.log(dataValueGet);
                if(resultat.dataValues && dataValueGet.length > 0){
                    restitValue();
                }
            }, function (err) {
                alert("erreur dans getDataValue");
            });
        }

        function restitValue() {
            console.log("entrer dans restitValue");
            var temp = [];
            for(var i=0,j=dataValueGet.length;i<j;i++){
                for(var k=0,l=dataElement.length;k<l;k++){
                    if(dataValueGet[i].dataElement == dataElement[k].id){
                        dataElement[k].value = dataValueGet[i].value;
                        temp.push(dataElement[k]);
                        break;
                    }
                }
            }
            console.log("dataElement");
            console.log(dataElement);
            console.log("temp");
            console.log(temp);
            mappingEntre();
        }

        function mappingEntre() {
            console.log("entrer dans mappingEntre");
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2A"){$scope.H12A = dataElement[i].value ; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2B"){$scope.H12B = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2C"){ $scope.H12C = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2D"){$scope.H12D = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2E"){$scope.H12E = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2F"){ $scope.H12F = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2G"){$scope.H12G = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2H"){$scope.H12H = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2I"){$scope.H12I = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2K"){$scope.H12K = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2J"){$scope.H12J = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.1A"){$scope.H21A = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.1B"){$scope.H21B = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.1C"){$scope.H21C = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.1D"){$scope.H21D = dataElement[i].value ; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.1E"){$scope.H21E = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.1F"){$scope.H21F = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.1G"){$scope.H21G = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.2A"){$scope.H22A = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1A"){$scope.H31A = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1B"){$scope.H31B = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1C"){$scope.H31C = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1D"){$scope.H31D = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1E"){$scope.H31E = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1F"){$scope.H31F = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1G"){$scope.H31G = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1H"){$scope.H31H = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1I"){$scope.H31I = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1J"){$scope.H31J = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1K"){$scope.H31K = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1L"){$scope.H31L = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1M"){$scope.H31M = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1N"){$scope.H31N = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "4.1A"){$scope.H41A = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "4.1B"){$scope.H41B = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "4.1C"){$scope.H41C = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "4.1D"){$scope.H41D = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "4.1E"){$scope.H41E = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "4.1F"){$scope.H41F = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "5.3A"){$scope.H53A = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "5.3B"){$scope.H53B = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "5.3C"){$scope.H53C = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "5.3D"){$scope.H53D = dataElement[i].value; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "5.3E"){$scope.H53E = dataElement[i].value; break;}
            }
        }

        function getChildren() {
            orgUnitResource.query({
                id: $rootScope.orgUnitSelectedId,
                fields: 'children'
            }, function (data) {
                children = data.children;
                console.log('children');
                console.log(children);
                compte = 0;
                getChildrenDataSet();
            },function (err) {
            });
        }

        function getChildrenDataSet() {
            orgUnitResource.query({
                id: children[compte].id,
                fields: 'dataSets'
            }, function (data) {
                console.log("resulat getChildrenDataSet");
                console.log(data);
                children[compte].dataSets = [];
                if(data.dataSets && data.dataSets.length > 0){
                    children[compte].dataSets = data.dataSets;
                }
                compte++;
                if(compte<children.length){
                    getChildrenDataSet();
                }else{
                    console.log('children');
                    console.log(children);
                    searchdataSet();
                }
            },function (err) {
            });
        }

        function searchdataSet() {
            console.log("entrer dans searchdataSet");
            console.log($rootScope.tousDataSets);
            for(var i=0,j=$rootScope.tousDataSets.length;i<j;i++){
                if($rootScope.tousDataSets[i].code == "CHA_MSR"){
                    console.log("trouver !!!!");
                    console.log ($rootScope.tousDataSets[i]);
                    id_cha = $rootScope.tousDataSets[i].id;
                }
            }
            compte = 0;
            childrenComplete = [];
            searchChildrenComplete();
        }

        function searchChildrenComplete() {
            console.log("entrer searchChildrenComplete");
            dataValueSetsResource.query({
                dataSet: id_cha,
                period: $rootScope.periode,
                orgUnit: children[compte].id
            }, function (resultat) {
                console.log("resultat searchChildrenComplete");
                console.log(resultat);
                if(resultat.dataValues && resultat.dataValues.length > 0){
                    var temp = {};
                    temp.id = children[compte].id;
                    childrenComplete.push(temp);
                }
                compte++;
                if(compte < children.length){
                    searchChildrenComplete();
                }else{
                    console.log("childrenComplete");
                    console.log(childrenComplete);
                    childrenCompleteExist();
                }
            }, function (err) {
                console.log("erreur dans searchChildrenComplete");
                compte++;
                if(compte < children.length){
                    searchChildrenComplete();
                }else{
                    console.log("childrenComplete");
                    console.log(childrenComplete);
                    childrenCompleteExist();
                }
            });

        }

        function childrenCompleteExist() {
            console.log("entrer dans childrenCompleteExist");
            if(childrenComplete.length > 0){
                compte = 0;
                childrenCompleteName();
            }
        }

        function childrenCompleteName() {
            console.log("entrer dans childrenCompleteName");
            orgUnitResource.query({
                id: childrenComplete[compte].id,
                fields: 'name'
            }, function (data) {
                childrenComplete[compte].name = data.name;
                compte++;
                if(compte<childrenComplete.length){
                    childrenCompleteName();
                }else{
                    console.log("childrenComplete");
                    console.log(childrenComplete);
                    formatChildren();
                }
            },function (err) {

            });
        }

        function formatChildren() {
            if(childrenComplete[0]){$scope.CHA_valeur1 = childrenComplete[0].name;}
            if(childrenComplete[1]){$scope.CHA_valeur2 = childrenComplete[1].name;}
            if(childrenComplete[2]){$scope.CHA_valeur3 = childrenComplete[2].name;}
            if(childrenComplete[3]){$scope.CHA_valeur4 = childrenComplete[3].name;}
            if(childrenComplete[4]){$scope.CHA_valeur5 = childrenComplete[4].name;}
            if(childrenComplete[5]){$scope.CHA_valeur6 = childrenComplete[5].name;}
            if(childrenComplete[6]){$scope.CHA_valeur7 = childrenComplete[6].name;}
            if(childrenComplete[7]){$scope.CHA_valeur8 = childrenComplete[7].name;}
            if(childrenComplete[8]){$scope.CHA_valeur9 = childrenComplete[8].name;}
            if(childrenComplete[9]){$scope.CHA_valeur10 = childrenComplete[9].name;}
            if(childrenComplete[10]){$scope.CHA_valeur11 = childrenComplete[10].name;}
            if(childrenComplete[11]){$scope.CHA_valeur12 = childrenComplete[11].name;}
            if(childrenComplete[12]){$scope.CHA_valeur13 = childrenComplete[12].name;}
            if(childrenComplete[13]){$scope.CHA_valeur14 = childrenComplete[13].name;}
            if(childrenComplete[14]){$scope.CHA_valeur15 = childrenComplete[14].name;}
            if(childrenComplete[15]){$scope.CHA_valeur16 = childrenComplete[15].name;}

            getDataElements();
        }

        $scope.enregistrer = function () {
            console.log("entrer dans enregistrer");
            console.log(angular.copy(dataElement));
        }

        $scope.lossFocus = function (leCode, laValeur) {
            console.log("leCode = "+leCode+" laValeur = "+laValeur);
            if(leCode && laValeur){
                for(var i=0,j=dataElement.length;i<j;i++){
                    if(dataElement[i].code == leCode){
                        console.log("++++++++i = "+i);
                        dataElement[i].value = laValeur;
                        var temp = [];
                        temp.push(dataElement[i]);
                        formaterValue(temp);
                        break;
                    }
                }
            }
        }


        function formaterValue(valueTable) {
            console.log("entrer dans formaterValue");
            getdata.dataValues = [];
            console.log("valueTable");
            console.log(valueTable);
            for(var i=0,j=valueTable.length;i<j; i++){
                var temp = {};
                temp.dataElement = valueTable[i].id;
                temp.value = valueTable[i].value;
                getdata.dataValues.push(temp);
            }
            console.log("data envoyer");
            console.log(getdata);
            editData(getdata);
        }

        function editData(data) {
            console.log("entrer dans Edit");
            var lapromise = dataValueSetsResourceEdit.save(data);
            lapromise.$promise.then(function (resultat) {
                console.log("resultat editData");
                console.log(resultat);
            }, function (err) {
                console.log("err editData");
                console.log(err);
            });
        }
    }
]);