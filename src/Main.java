import java.util.Map;

public class Main {
    public static void main(String[] args) {
        new Main();
    }

    Main() {
        FollowerFetcher.getInstance().fetchSessionidCookie();

        long start = System.currentTimeMillis();
        FollowerFetcher.getInstance().getFollowers("19410587");
        long end = System.currentTimeMillis() - start;
//        for (Follower f : FollowerFetcher.getInstance().getFollowerSet()) {
//            System.out.println(f);
//        }
//        System.out.println("///////////////////////////////////////////////////////////////////////////////");
//        System.out.println("Number of requests: 10");
//        System.out.println("Number of followers: " + FollowerFetcher.getInstance().getFollowerSet().size());
//        System.out.println("Time needed to crawl followers: "+end+"ms. ");
//        System.out.println("///////////////////////////////////////////////////////////////////////////////");


        System.out.println("List");
        System.out.println("//////////////////////////////////////////");
        for (Follower f : FollowerFetcher.getInstance().list) {
            System.out.println(f);
        }
        System.out.println("//////////////////////////////////////////");
        System.out.println("Map");
        System.out.println("//////////////////////////////////////////");
        for (Map.Entry<String, Follower> entry : FollowerFetcher.getInstance().map.entrySet()) {
            System.out.println(entry.getKey() + " " + entry.getValue());
        }
        System.out.println("//////////////////////////////////////////");
        System.out.println("Number of requests per account: 50");
        System.out.println("Items in list: " + FollowerFetcher.getInstance().list.size());
        System.out.println("Items in map: " + FollowerFetcher.getInstance().map.values().size());

        System.out.println(FollowerFetcher.getInstance().getLastCurrsor());
    }
}
