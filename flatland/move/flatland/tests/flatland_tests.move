#[test_only]
module flatland::flatland_tests {
    use flatland::flatland;
    use flatland::flatland::mint_internal;
    use std::string::String;
    use sui::test_scenario;
    use sui::random::{Self, Random};

    fun b36_test_setup(addr: address, target: String): bool {
        flatland::to_b36(addr) == target

    }

    #[test]
    fun test_to_b36() {
        assert!(b36_test_setup(@0x1234, b"3lg".to_string()), 0);
        assert!(b36_test_setup(@0x31487601236501328476, b"11wchdxusx6n4f3q".to_string()), 0);
    }

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
