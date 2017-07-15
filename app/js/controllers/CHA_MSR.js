cbis.controller('CHA_MSR', ['$scope', '$rootScope','DataSetResource','DataElementResource','dataValueSetsResourceEdit','$filter','dataValueSetsResource','orgUnitResource','completeDataSetRegistrations',
    function ($scope, $rootScope, DataSetResource,DataElementResource,dataValueSetsResourceEdit,$filter,dataValueSetsResource,orgUnitResource,completeDataSetRegistrations) {

        var compte = 0, dataValueGet = [],getdata = {};
        var parent={},notreDataset = {}, notreOrgUnitId, notrePeriode;
        console.log("$rootScope.datasetSelected======>");
        console.log($rootScope.datasetSelected);


        notreDataset = angular.copy($rootScope.datasetSelected);
        notreOrgUnitId = angular.copy($rootScope.orgUnitSelectedId);
        notrePeriode = angular.copy($rootScope.periode);

        if(notreDataset.id && notrePeriode && notreOrgUnitId){
            enteteGetValue();
            //getDataElements();
            getDataValue();
        }
        function enteteGetValue() {
            getdata = {};
            getdata.dataSet = notreDataset.id;
            getdata.completeData = formatDate();
            getdata.period = notrePeriode;
            getdata.orgUnit = notreOrgUnitId;
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
                /*console.log("resultat dataElementsCode");
                 console.log(resultat);*/
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
                dataSet: notreDataset.id,
                period: notrePeriode,
                orgUnit: notreOrgUnitId
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
                for(var k=0,l=notreDataset.dataElement.length;k<l;k++){
                    if(dataValueGet[i].dataElement == notreDataset.dataElement[k].id){
                        notreDataset.dataElement[k].value = dataValueGet[i].value;
                        temp.push(notreDataset.dataElement[k]);
                        break;
                    }
                }
            }
            console.log("notreDataset");
            console.log(notreDataset);
            console.log("temp");
            console.log(temp);
            mappingEntre();
        }

        function mappingRoot() {

            console.log("entrer dans lossFocus");
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2A"){dataElement[i].value = $scope.H12A; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2B"){dataElement[i].value = $scope.H12B; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2C"){dataElement[i].value = $scope.H12C; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2D"){dataElement[i].value = $scope.H12D; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2E"){dataElement[i].value = $scope.H12E; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2F"){dataElement[i].value = $scope.H12F; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2G"){dataElement[i].value = $scope.H12G; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2H"){dataElement[i].value = $scope.H12H; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2I"){dataElement[i].value = $scope.H12I; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2K"){dataElement[i].value = $scope.H12K; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "1.2J"){dataElement[i].value = $scope.H12J; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.1A"){dataElement[i].value = $scope.H21A; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.1B"){dataElement[i].value = $scope.H21B; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.1C"){dataElement[i].value = $scope.H21C; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.1D"){dataElement[i].value = $scope.H21D; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.1E"){dataElement[i].value = $scope.H21E; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.1F"){dataElement[i].value = $scope.H21F; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.1G"){dataElement[i].value = $scope.H21G; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "2.2A"){dataElement[i].value = $scope.H22A; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1A"){dataElement[i].value = $scope.H31A; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1B"){dataElement[i].value = $scope.H31B; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1C"){dataElement[i].value = $scope.H31C; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1D"){dataElement[i].value = $scope.H31D; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1E"){dataElement[i].value = $scope.H31E; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1F"){dataElement[i].value = $scope.H31F; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1G"){dataElement[i].value = $scope.H31G; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1H"){dataElement[i].value = $scope.H31H; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1I"){dataElement[i].value = $scope.H31I; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1J"){dataElement[i].value = $scope.H31J; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1K"){dataElement[i].value = $scope.H31K; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1L"){dataElement[i].value = $scope.H31L; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1M"){dataElement[i].value = $scope.H31M; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "3.1N"){dataElement[i].value = $scope.H31N; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "4.1A"){dataElement[i].value = $scope.H41A; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "4.1B"){dataElement[i].value = $scope.H41B; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "4.1C"){dataElement[i].value = $scope.H41C; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "4.1D"){dataElement[i].value = $scope.H41D; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "4.1E"){dataElement[i].value = $scope.H41E; break;}
            }
            for(var i=0,j=dataElement.length;i<j;i++){
                if(dataElement[i].code == "4.1F"){dataElement[i].value = $scope.H41F; break;}
            }
            console.log("dataElement ===");
            console.log(dataElement);
            //formaterValue(dataElement);
        }

        function mappingEntre() {
            console.log("entrer dans mappingEntre");
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "1.2A"){$scope.H12A = notreDataset.dataElement[i].value ; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "1.2B"){$scope.H12B = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "1.2C"){ $scope.H12C = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "1.2D"){$scope.H12D = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "1.2E"){$scope.H12E = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "1.2F"){ $scope.H12F = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "1.2G"){$scope.H12G = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "1.2H"){$scope.H12H = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "1.2I"){$scope.H12I = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "1.2K"){$scope.H12K = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "1.2J"){$scope.H12J = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "2.1A"){$scope.H21A = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "2.1B"){$scope.H21B = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "2.1C"){$scope.H21C = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "2.1D"){$scope.H21D = notreDataset.dataElement[i].value ; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "2.1E"){$scope.H21E = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "2.1F"){$scope.H21F = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "2.1G"){$scope.H21G = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "2.2A"){$scope.H22A = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "3.1A"){$scope.H31A = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "3.1B"){$scope.H31B = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "3.1C"){$scope.H31C = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "3.1D"){$scope.H31D = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "3.1E"){$scope.H31E = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "3.1F"){$scope.H31F = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "3.1G"){$scope.H31G = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "3.1H"){$scope.H31H = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "3.1I"){$scope.H31I = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "3.1J"){$scope.H31J = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "3.1K"){$scope.H31K = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "3.1L"){$scope.H31L = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "3.1M"){$scope.H31M = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "3.1N"){$scope.H31N = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "4.1A"){$scope.H41A = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "4.1B"){$scope.H41B = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "4.1C"){$scope.H41C = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "4.1D"){$scope.H41D = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "4.1E"){$scope.H41E = notreDataset.dataElement[i].value; break;}
            }
            for(var i=0,j=notreDataset.dataElement.length;i<j;i++){
                if(notreDataset.dataElement[i].code == "4.1F"){$scope.H41F = notreDataset.dataElement[i].value; break;}
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
        function formatDate() {
            var laDate = new Date();
            laDate = $filter('date')(laDate, 'yyyy-MM-dd');
            console.log("laDate = "+laDate);
            return laDate;
        }

        function editData(data) {
            console.log("entrer dans Edit");
            var lapromise = dataValueSetsResourceEdit.save(data);
            lapromise.$promise.then(function (resultat) {
                console.log("resultat editData");
                console.log(resultat);
                complete();
            }, function (err) {
                console.log("err editData");
                console.log(err);
            });
        }

        /*function editOne() {
         console.log("dataElement+++++++++editOne");
         console.log(angular.copy(dataElement));
         for(var i=0,j=dataElement.length;i<j;i++){
         if(dataElement[i].id){
         if(dataElement[i].code){
         if(dataElement[i].value){
         console.log("dataElement complete");
         console.log(angular.copy(dataElement[i]));
         var temp = angular.copy(dataElement[i]);
         dataElement = [];
         dataElement.push(temp);
         break;
         }
         }
         }
         }
         console.log("dataElement+++++++++editOne-----------fin");
         console.log(dataElement);
         formaterValue();
         }*/

        $scope.lossFocus = function (lecode, valeur) {
            console.log("entrer dans lossFocus");
            console.log("lecode = "+lecode+";=> valeur = "+valeur);
            if(valeur){
                var tempo = [];
                for(var i=0,j=dataElement.length;i<j;i++){
                    if(dataElement[i].code == lecode){dataElement[i].value = valeur;
                        console.log("touver !!!!!!!!!!!!!");
                        console.log(dataElement[i]);
                        tempo.push(dataElement[i]);
                        formaterValue(tempo);
                        break;
                    }
                }

            }

        }

        $scope.enregistrer = function () {
            console.log("entrer dans enregistrer++++++++++++++++++++++");
            console.log(dataElement);
            console.log(angular.copy(dataElement));
            formaterValue(dataElement);
            deleteEmpty();
            //getParent();
        }

        function complete() {
            console.log("entrer complete");
            var temp = {};
            temp.ds = $rootScope.datasetSelected.id;
            temp.pe = $rootScope.periode;
            temp.ou = $rootScope.orgUnitSelectedId;
            temp.multiOu = false;
            console.log(temp);
            var lapromise = completeDataSetRegistrations.save(temp);
            lapromise.$promise.then(function (resultat) {
                console.log("resultat complete");
                console.log(resultat);
            }, function (err) {
                console.log("err editData");
                console.log(err);
            });
        }

        function deleteEmpty() {
            var i=0, conti = true;
            while(conti){
                if(!dataElement[i].value || !dataElement[i].code){
                    dataElement.splice(i, 1);
                    i--;
                }
                i++;
                if(i == dataElement.length){
                    conti = false;
                }
            }
            console.log("dataElement apres delete");
            console.log(dataElement);
        }
        function getParent() {
            orgUnitResource.query({
                id: $rootScope.orgUnitSelectedId,
                fields: 'parent'
            }, function (data) {
                console.log(data);
                parent.id = data.parent.id;
                console.log("parentId = "+parent.id);
                getParentDataSet()
            },function (err) {

            });
        }

        function getParentDataSet() {
            orgUnitResource.query({
                id: parent.id,
                fields: 'dataSets'
            }, function (data) {
                console.log(data);
                parent.dataSets = data.dataSets;
                console.log("parent for dataSets");
                console.log(angular.copy(parent));
                searchDataSet();
            },function (err) {

            });
        }

        function searchDataSet() {
            console.log("entrer dans searchDataSet");
            for(var i=0,j=$rootScope.tousDataSets.length;i<j;i++){
                if($rootScope.tousDataSets[i].code == "CHSS_MSR"){
                    for(var a=0,b=parent.dataSets.length;a<b;a++){
                        if($rootScope.tousDataSets[i].id == parent.dataSets[a].id){
                            parent.leDataSet = parent.dataSets[a].id;
                            getParentDataElements();
                            break;
                        }
                    }
                    break;
                }
            }
        }

        function getParentDataElements() {
            console.log("entrer dans getParentDataElements");
            DataSetResource.query({
                id: parent.leDataSet,
                fields: 'dataSetElements'
            }, function (resultat) {
                parent.dataElement = resultat.dataSetElements;
                console.log("parent for dataElement");
                console.log(angular.copy(parent));
                parentDataElementsId();
            }, function (err) {
            });
        }

        function parentDataElementsId() {
            console.log("entrer dans parentDataElementsId");
            for(var i=0,j=parent.dataElement.length;i<j;i++){
                parent.dataElement[i] = parent.dataElement[i].dataElement;
            }
            console.log("parent for parentDataElementsId");
            console.log(angular.copy(parent));
            getParentDataValue()
        }

        function getParentDataValue() {
            console.log("entrer dans getParentDataValue");
            dataValueSetsResource.query({
                dataSet: parent.leDataSet,
                period: $rootScope.periode,
                orgUnit: parent.id
            }, function (resultat) {
                console.log("resultat");
                console.log(resultat);
                if(resultat.dataValues){
                    ParentrestitValue(resultat.dataValues);
                }else{
                    parentValeur();
                }

            }, function (err) {
                alert("erreur dans getParentDataValue");
            });
        }
        function parentValeur() {
            console.log("dataElement");
            console.log(dataElement);
            console.log("parent parentValeur");
            console.log(angular.copy(parent));
            for(var k=0,l=dataElement.length;k<l;k++){
                for(var i=0,j=parent.dataElement.length;i<j;i++){
                    if(dataElement[k].id == parent.dataElement[i].id){
                        parent.dataElement[i].value = dataElement[k].value;
                        break;
                    }
                }
            }
            console.log("parent parentValeur +++ fin");
            console.log(angular.copy(parent));
            prepaEnvoie();
        }

        function ParentrestitValue(data) {
            console.log("entrer dans ParentrestitValue");
            for(var i=0,j=data.length;i<j;i++){
                for(var k=0,l=parent.dataElement.length;k<l;k++){
                    if(data[i].dataElement == parent.dataElement[k].id){
                        parent.dataElement[k].value = data[i].value;
                        console.log("k = "+k);
                        break;
                    }
                }
            }
            console.log("parent");
            console.log(parent);
            addValue();
        }
        function prepaEnvoie() {
            getdata = {};
            getdata.dataSet = parent.leDataSet;
            getdata.period = $rootScope.periode;
            getdata.orgUnit = parent.id;
            getdata.dataValues = [];
            formaterValue(parent.dataElement);
        }

        function addValue() {
            console.log("entrer dans addValue");
            for(var i=0,j=dataElement.length; i<j;i++){
                for(var k=0,l= parent.dataElement.length;k<l;k++){
                    if(dataElement[i].id == parent.dataElement[k].id){
                        dataElement[i].value =  parseInt(dataElement[i].value);
                        if(parent.dataElement[k].value){
                            parent.dataElement[k].value = parseInt(parent.dataElement[k].value);
                            parent.dataElement[k].value = parent.dataElement[k].value + dataElement[i].value;
                        }else{
                            parent.dataElement[k].value = dataElement[i].value;
                        }
                        break;
                    }
                }
            }
            console.log("parent for dataElement");
            console.log(parent);
            formaterValue(parent.dataElement);
        }
    }

]);