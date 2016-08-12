({
    doinit : function(component, event, helper) {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){     
                component.set("v.comLat",position.coords.latitude);
                component.set("v.comLong",position.coords.longitude);
            });	
        }
    },
    handleValueChange : function(component, event, helper) {
        var action = component.get("c.openRecords");
        action.setParams({
            lati : component.get("v.comLat"),
            longi: component.get("v.comLong")
        });      
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set("v.TaskRecords",response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        
    }
})
