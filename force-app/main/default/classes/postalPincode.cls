public with sharing class PostalPincode {
    public String message {set;get;}
    public String status {set;get;}
    public List<PostOffice> postOffice {set;get;}
    public static List<PostalPincode> parse(String json) {
		return (List<PostalPincode>) System.JSON.deserialize(json, List<PostalPincode>.class);
	}

}