s = new scene("id");
s = new scene("id.namespace");
s = new scene("id.namespace",{widthHex:2});
//create scene
s.layer();
//get layers array (?)
s.layer("id id1 idN");
s.layer("id.namespace#12 id1#zIndex.namespace id2.namespace id3#zIndex");
//# - zIndex
//create and select layers or set attr
