public with sharing class AccountService {
    @auraenabled
    public static void createAccountContact(AccountWrapper wrapper)
    {
        system.debug('wrapper:'+wrapper);
        if(wrapper!=null)
        {
            Account act=new Account();
            act.Name=wrapper.Name;
            act.NumberOfEmployees=wrapper.NumberOfEmployees;
insert act;
            if(wrapper.Contacts!=null)
            {
                for(Contact ct:wrapper.Contacts)
                {
                    ct.AccountId=act.id;
                }
                insert wrapper.Contacts;
            }
        }
    }
}