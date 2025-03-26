/// The flatland NFT game project.
module flatland::flatland;

use std::string::String;
use sui::display;
use sui::package;
use sui::hex;
use sui::random::{Random, RandomGenerator};

// editorconfig-checker-disable
const POINTS_TABLE: vector<vector<u8>> = vector[
    b"100.0,50.0 143.30127018922195,125.0 56.698729810778076,125.00000000000001",
    b"100.0,50.0 150.0,100.0 100.0,150.0 50.0,100.0",
    b"100.0,50.0 147.55282581475768,84.54915028125264 129.38926261462365,140.45084971874738 70.61073738537635,140.45084971874738 52.44717418524232,84.54915028125264",
    b"100.0,50.0 143.30127018922192,75.0 143.30127018922195,125.0 100.0,150.0 56.698729810778076,125.00000000000001 56.69872981077805,75.00000000000003",
    b"100.0,50.0 139.0915741234015,68.82550990706332 148.74639560909117,111.12604669781572 121.69418695587791,145.04844339512096 78.30581304412209,145.04844339512096 51.25360439090882,111.12604669781572 60.90842587659851,68.82550990706333",
    b"100.0,50.0 135.35533905932738,64.64466094067262 150.0,100.0 135.35533905932738,135.35533905932738 100.0,150.0 64.64466094067262,135.35533905932738 50.0,100.0 64.64466094067262,64.64466094067262",
    b"100.0,50.0 132.13938048432698,61.697777844051096 149.2403876506104,91.31759111665349 143.30127018922195,125.0 117.10100716628344,146.9846310392954 82.89899283371656,146.98463103929544 56.698729810778076,125.00000000000001 50.75961234938959,91.3175911166535 67.86061951567302,61.6977778440511",
    b"100.0,50.0 129.38926261462365,59.54915028125263 147.55282581475768,84.54915028125264 147.55282581475768,115.45084971874736 129.38926261462365,140.45084971874738 100.0,150.0 70.61073738537635,140.45084971874738 52.447174185242325,115.45084971874738 52.44717418524232,84.54915028125264 70.61073738537634,59.549150281252636",
    b"100.0,50.0 127.03204087277989,57.93732335844094 145.48159976772592,79.22924934990569 149.49107209404664,107.11574191366425 137.78747871771293,132.74303669726424 114.08662784207148,147.97464868072487 85.91337215792853,147.97464868072487 62.21252128228709,132.74303669726424 50.508927905953364,107.11574191366427 54.518400232274075,79.2292493499057 72.96795912722013,57.93732335844094",
    b"100.0,50.0 125.0,56.69872981077806 143.30127018922192,75.0 150.0,100.0 143.30127018922195,125.0 125.00000000000001,143.30127018922192 100.0,150.0 75.0,143.30127018922195 56.698729810778076,125.00000000000001 50.0,100.0 56.69872981077805,75.00000000000003 74.99999999999997,56.69872981077808",
    b"100.0,50.0 123.23615860218842,55.72719871733951 141.14919329468282,71.5967626634422 149.63544370490268,93.97316598723384 146.75081213427075,117.73024435212677 133.15613291203977,137.42553740855504 111.96578321437791,148.5470908713026 88.03421678562212,148.5470908713026 66.84386708796025,137.42553740855507 53.24918786572926,117.73024435212679 50.364556295097294,93.97316598723388 58.850806705317176,71.59676266344222 76.76384139781155,55.72719871733952",
    b"100.0,50.0 121.69418695587791,54.951556604879045 139.0915741234015,68.82550990706332 148.74639560909117,88.87395330218428 148.74639560909117,111.12604669781572 139.0915741234015,131.17449009293668 121.69418695587791,145.04844339512096 100.0,150.0 78.30581304412209,145.04844339512096 60.908425876598514,131.17449009293668 51.25360439090882,111.12604669781572 51.25360439090882,88.87395330218429 60.90842587659851,68.82550990706333 78.30581304412209,54.951556604879045",
];
// editorconfig-checker-enable

public struct Color has store, drop {
    r: u8,
    g: u8,
    b: u8,
}

public struct Flatlander has key, store {
    id: UID,
    color: Color,
    sides: u8,
    hexaddr: String,
    image_blob: String,
}

// OTW for display.
public struct FLATLAND has drop {}

fun init(otw: FLATLAND, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);
    let mut display = display::new<Flatlander>(&publisher, ctx);

    display.add(
        b"link".to_string(),
        b"https://flatland.wal.app/0x{hexaddr}".to_string(),
    );
    display.add(
        b"image_url".to_string(),
        b"data:image/svg+xml;charset=utf8,{image_blob}".to_string(),
    );
    display.update_version();

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}

/// Creates a new Flatlander.
///
/// The color and number of sides are chosen at random.
entry fun mint(random: &Random, ctx: &mut TxContext) {
    let mut rng = random.new_generator(ctx);
    let flatlander = new(&mut rng, ctx);
    transfer::transfer(flatlander, tx_context::sender(ctx));
}

fun new(rng: &mut RandomGenerator, ctx: &mut TxContext): Flatlander {
    let id = object::new(ctx);
    let hexaddr = hex::encode(id.to_bytes()).to_string();
    let color = random_color(rng);
    let sides = random_sides(rng);
    let image_blob = svg(sides, &color);
    Flatlander {
        id,
        color,
        sides,
        hexaddr,
        image_blob,
    }
}


fun svg(num_sides: u8, color: &Color): String {
    let r = num_to_ascii(color.r as u64);
    let g = num_to_ascii(color.g as u64);
    let b = num_to_ascii(color.b as u64);
    let index = (num_sides - 3u8) as u64;
    let table = POINTS_TABLE;

    let mut chunks = vector[
            b"<svg width='200' height='200' xmlns='http://www.w3.org/2000/svg'>",
            b"<rect width='200' height='200' fill = 'rgba(", r, b",", g, b",", b, b",0.2)' />",
            b"<polygon fill = 'rgba(", r, b",", g, b",", b, b",1)' ",
            b"points = '", table[index],
            b"'>",
            // editorconfig-checker-disable
            b"<animateTransform attributeName='transform' begin='0s' dur='10s' type='rotate' from='0 100 100' to='360 100 100' repeatCount='indefinite'></animateTransform></polygon>",
            // editorconfig-checker-enable
            b"</svg>",
        ];
    chunks.reverse();

    let mut str = vector[];
    chunks.destroy!(|chunk| str.append(chunk));
    str.to_string()
}

fun num_to_ascii(mut num: u64): vector<u8> {
    let mut res = vector[];
    if (num == 0) return vector[48];
    while (num > 0) {
        let digit = (num % 10) as u8;
        num = num / 10;
        res.insert(digit + 48, 0);
    };
    res
}

fun random_color(rng: &mut RandomGenerator): Color {
    Color { r: rng.generate_u8(), g: rng.generate_u8(), b: rng.generate_u8() }
}

fun random_sides(rng: &mut RandomGenerator): u8 {
    rng.generate_u8_in_range(3, 14)
}

#[test_only]
public fun mint_internal(random: &Random, ctx: &mut TxContext) {
    mint(random, ctx)
}
