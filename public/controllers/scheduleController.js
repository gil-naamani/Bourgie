bourgie.controller('scheduleController', ['$scope', '$uibModal', '$log', '$http', function($scope, $uibModal, $log, $http){

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.init = function(){
      getEvents();
    }

    /* event source that contains custom events on the scope */
    $scope.events = [];
    $scope.eventSources = [$scope.events];

    $scope.uiConfig = {
      calendar:{
        height: 750,
        editable: true,
        header:{
          left: 'month basicWeek basicDay',
          // center: 'today prev,next',
          right: 'title'
        },
        eventClick: function(date, jsEvent, view){
            $scope.open(date.details);
        }
      }
    };

  $scope.modalTitle = "";
  $scope.animationsEnabled = true;

  $scope.open = function (eventObj) {

    (eventObj) ? $scope.modalTitle = "Edit Event" : $scope.modalTitle = "Schedule Event";
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'scheduleModal.html',
      controller: 'scheduleModalController',
      resolve: {
        //set defaults - none if creating new, but prepoulate modal if editing
        defaults: function () {
          var objDate;
          (eventObj) ? objDate = new Date(eventObj.next_due_date * 1000) : objDate = new Date();
          return {
            title : $scope.modalTitle,
            username : $scope.user,
            id : eventObj.schedule_id,
            category : eventObj.user_category_id,
            name : eventObj.name,
            amount : eventObj.amount,
            date : objDate,
            interval : eventObj.repeat_interval
          };
        }
      }
    });

    modalInstance.result.then(function (eventObj) {
      console.log(eventObj);
      var action = eventObj.action;
      if (action === "create"){
        createEvent(eventObj);
      } else if (action === "update"){
        updateEvent(eventObj);
      } else if (action === "delete"){
        deleteEvent(eventObj);
      }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  function getEvents(){
    $http.get('/schedule/'+$scope.user).success(function(res){
      $scope.events.length = 0;
      angular.forEach(res.data, function(schedule, index){
        populateEvents(schedule);
      });
    }).error(function(err){
      console.log(err);
    })
  }

  // Create all the events for the month
  // if weekly, create events for every week etc..
  function populateEvents(schedule){

    var htmlClass;
    (schedule.amount > 0) ? htmlClass = "income" : htmlClass = "expense";
    // add the scheduled event
    $scope.events.push({
      details : schedule,
      title: schedule.name,
      start: new Date(schedule.next_due_date * 1000),
      allDay: true,
      className: [htmlClass]
    });
    // if no interval is set, just return after creating the one event
    var interval = schedule.repeat_interval;
    if (!interval || interval == "null"){
      return;
    }
    //if an interval is set, check if its weekly or biweekly and set the numDays accordingly
    // if its monthly, or annually - just return;
    var startDay = new Date(schedule.next_due_date * 1000).getDate();
    var numDays;
    switch (interval) {
      case "weekly":
        numDays = 7;
        break;
      case "biweekly":
        numDays = 14;
        break;
      default:
        return;
    }
    // go through the whole month, starting at the next due date and keep adding events until the end of the month
    var nextDay = startDay + numDays;
    while (nextDay < 31){
      var newDate = new Date();
      newDate.setDate(nextDay);
      $scope.events.push({
        details : schedule,
        title: schedule.name,
        start: newDate,
        allDay: true,
        className: [htmlClass]
      });
      nextDay += numDays;
    }
  }

  function createEvent(eventObj) {
    eventObj.category = 2; //TODO: dont hard code this;
    eventObj.date = eventObj.date.toISOString().slice(0, 19).replace('T', ' ');
    console.log(eventObj);
    $http.post('/schedule', eventObj).success(function(res){
      getEvents();
      console.log(res);
    }).error(function(err){
      console.log(err);
    })

  }

  function updateEvent(eventObj){
    eventObj.date = eventObj.date.toISOString().slice(0, 19).replace('T', ' ');
    $http.put('/schedule/'+eventObj.id, eventObj).success(function(res){
      getEvents();
      console.log(res);
    }).error(function(err){
      console.log(err);
    })
  }

  function deleteEvent(eventObj){
    $http.delete('/schedule/'+eventObj.id, eventObj).success(function(res){
      getEvents();
      console.log(res);
    }).error(function(err){
      console.log(err);
    })
  }

}]);
