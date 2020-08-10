console.clear();

const body = d3.select("body")

const A_audio = body.append("audio").classed("A-audio", true)
const B_audio = body.append("audio").classed("B-audio", true)
const C_audio = body.append("audio").classed("C-audio", true)
const D_audio = body.append("audio").classed("D-audio", true)
const E_audio = body.append("audio").classed("E-audio", true)
const F_audio = body.append("audio").classed("F-audio", true)
const G_audio = body.append("audio").classed("G-audio", true)


A_audio.append("source")
.attr("src", "asset/piano117.mp3")
.attr("type", "audio/mpeg")
B_audio.append("source")
.attr("src", "asset/piano118.mp3")
.attr("type", "audio/mpeg")
C_audio.append("source")
.attr("src", "asset/piano112.mp3")
.attr("type", "audio/mpeg")
D_audio.append("source")
.attr("src", "asset/piano113.mp3")
.attr("type", "audio/mpeg")
E_audio.append("source")
.attr("src", "asset/piano114.mp3")
.attr("type", "audio/mpeg")
F_audio.append("source")
.attr("src", "asset/piano115.mp3")
.attr("type", "audio/mpeg")
G_audio.append("source")
.attr("src", "asset/piano116.mp3")
.attr("type", "audio/mpeg")

const octave_1_A = d3.select("#octave-1-A-key")
const octave_1_B = d3.select("#octave-1-B-key")
const octave_1_C = d3.select("#octave-1-C-key")
const octave_1_D = d3.select("#octave-1-D-key")
const octave_1_E = d3.select("#octave-1-E-key")
const octave_1_F = d3.select("#octave-1-F-key")
const octave_1_G = d3.select("#octave-1-G-key")


octave_1_A.on("click", () => {

    document.querySelector(".A-audio")
    .play()
})
octave_1_B.on("click", () => {

    document.querySelector(".B-audio")
    .play()
})
octave_1_C.on("click", () => {

    document.querySelector(".C-audio")
    .play()
})
octave_1_D.on("click", () => {

    document.querySelector(".D-audio")
    .play()
})
octave_1_E.on("click", () => {

    document.querySelector(".E-audio")
    .play()
})
octave_1_F.on("click", () => {

    document.querySelector(".F-audio")
    .play()
})
octave_1_G.on("click", () => {

    document.querySelector(".G-audio")
    .play()
})