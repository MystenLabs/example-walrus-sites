#[test_only]
module flatland::flatland_tests {
    use flatland::flatland::mint_internal;
    use sui::test_scenario;
    use sui::random::{Self, Random};

    #[test]
    fun test_mint() {
        let owner = @0x0;
        let mut scenario = test_scenario::begin(owner);
        random::create_for_testing(scenario.ctx());
        scenario.next_tx(owner);
        {
            let random = scenario.take_shared<Random>();
            mint_internal(&random, scenario.ctx());
            test_scenario::return_shared(random);
        };
        scenario.end();
    }
    // Tests are incomplete. PRs are welcome!
}
