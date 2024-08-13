#[test_only]
module flatland::flatland_tests {
    use flatland::flatland;
    use std::string::String;

    fun b36_test_setup(addr: address, target: String): bool {
        flatland::to_b36(addr) == target

    }

    #[test]
    fun test_to_b36() {
        assert!(b36_test_setup(@0x1234, b"3lg".to_string()), 0);
        assert!(b36_test_setup(@0x31487601236501328476, b"11wchdxusx6n4f3q".to_string()), 0);
    }

    // #[test, expected_failure(abort_code = ::flatland::flatland_tests::ENotImplemented)]
    // fun test_flatland_fail() {
        // abort ENotImplemented
    // }
}
