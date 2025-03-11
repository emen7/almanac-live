// Move the following files to a "storage" folder:
// a-more-about (1).htm
// a-more-about (2).htm
// a-more-about-work.htm
// a-more-charts-3d-model.htm
// a-more-charts-archit.htm
// a-more-charts-horizcross.htm
// a-more-charts-midspaceparadise.htm
// a-more-charts-paper81 (1).htm
// a-more-charts-vertcros-works.htm
// a-more-charts-vertcross (1).htm
// a-more-charts-vertcross (2).htm
// a-more-charts-vertcross-work.htm
// a-more-charts-videos.htm
// a-more-charts-visual-1.htm
// a-more-dictionary.htm
// a-more-kind-words.htm
// a-more-links.htm
// a-more-list-infer.htm
// a-more-list-paradise-pattern.htm
// a-more-list-personality-identity-TEST.htm
// a-more-list-unknown-energy.htm
// a-part4-timeline.htm
// g-masteruniveresecrosssection.htm
// g-masteruniveresecrosssection1200.htm
// g-midspacechart.htm
// g-muchartandsize.htm
// g-muverticalunlabeled1200.htm
// g-muverticalunlabeled800.htm
// g-part1-circuits.htm
// g-planeofcreation.htm
// g-planeslide.htm
// g-sadler-granduniverse.htm
// g-spacezones.htm
// q-evolutionary_panorama.htm
// q-milkyway.htm
// q-sagittariuscenter.htm
// timeline-modern.htm

// Create a "storage" folder and move the files
const fs = require("fs");
const path = require("path");

const filesToMove = [
	"a-more-about (1).htm",
	"a-more-about (2).htm",
	"a-more-about-work.htm",
	"a-more-charts-3d-model.htm",
	"a-more-charts-archit.htm",
	"a-more-charts-horizcross.htm",
	"a-more-charts-midspaceparadise.htm",
	"a-more-charts-paper81 (1).htm",
	"a-more-charts-vertcros-works.htm",
	"a-more-charts-vertcross (1).htm",
	"a-more-charts-vertcross (2).htm",
	"a-more-charts-vertcross-work.htm",
	"a-more-charts-videos.htm",
	"a-more-charts-visual-1.htm",
	"a-more-dictionary.htm",
	"a-more-kind-words.htm",
	"a-more-links.htm",
	"a-more-list-infer.htm",
	"a-more-list-paradise-pattern.htm",
	"a-more-list-personality-identity-TEST.htm",
	"a-more-list-unknown-energy.htm",
	"a-part4-timeline.htm",
	"g-masteruniveresecrosssection.htm",
	"g-masteruniveresecrosssection1200.htm",
	"g-midspacechart.htm",
	"g-muchartandsize.htm",
	"g-muverticalunlabeled1200.htm",
	"g-muverticalunlabeled800.htm",
	"g-part1-circuits.htm",
	"g-planeofcreation.htm",
	"g-planeslide.htm",
	"g-sadler-granduniverse.htm",
	"g-spacezones.htm",
	"q-evolutionary_panorama.htm",
	"q-milkyway.htm",
	"q-sagittariuscenter.htm",
	"timeline-modern.htm"
];

const storageDir = path.join(__dirname, "storage");
if (!fs.existsSync(storageDir)) {
	fs.mkdirSync(storageDir);
}

filesToMove.forEach((file) => {
	const oldPath = path.join(__dirname, file);
	const newPath = path.join(storageDir, file);
	fs.renameSync(oldPath, newPath);
});
