public with sharing class locationbasedActivities {
    @AuraEnabled
    public static list<task> openRecords(decimal lati,decimal longi){
        
        List<Account> acc = Database.Query('Select Id,Name,(select Id,subject,Account.Name,Status,priority from Tasks where remindatalocation__c = True and isClosed = False) from Account where Distance(BillingAddress,Geolocation('+lati+','+longi+'),\'mi\') < 50 limit 10');
        List<task> taskRecords = new List<task>();
        
        for(Account accountRecords : acc ){
            for(Task tk:accountRecords.tasks)
                taskRecords.add(tk);
        }
        
        return taskRecords;
    }
}