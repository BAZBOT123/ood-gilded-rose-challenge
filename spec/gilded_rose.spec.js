const Shop = require('../src/gilded_rose.js')
const Item = require('../src/item.js')

describe("Gilded Rose", function () {

  // First test
  it("add item foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  // Second test
  it("adds item to array with sellin and quality which decreases by -1 everyday", function () {
    const gildedRose = new Shop([new Item("Bread", 4, 4)]);
    const items = gildedRose.updateQuality(1);
    expect(items[0].sellIn).toEqual(3)
    expect(items[0].quality).toEqual(3);
  });

  // third test
  it("Sell by date has passed, Quality degrades twice as fast", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
  });

  // fourth test
  it("The Quality of an item is never negative", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", -6, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  // fifth test
  it("Aged Brie increases in Quality the older it gets", function () {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 4)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(6);
  });

  // sixth test
  it("The Quality of an item is never more than 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", -28, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  // seventh test
  it("Sulfuras, being a legendary item, never has to be sold or decreases in Quality", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(80);
  });

  // eighth test 
  // (A)
  it("Backstage passes, Quality increases by 2 when there are 10 days or less", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(9)
    expect(items[0].quality).toEqual(27);
  });

  // (B)
  it("Backstage passes, Quality increases by 3 when there are 5 days or less", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 35)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(4)
    expect(items[0].quality).toEqual(38);
  });

  // (C)
  it("Backstage passes, Quality drops to 0 after the concert", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(-3)
    expect(items[0].quality).toEqual(0);
  });

  // ninth test 
  it("Conjured items degrade in Quality twice as fast as normal items", function () {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(-1)
    expect(items[0].quality).toEqual(1);
  });


})