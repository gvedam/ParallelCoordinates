import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarchartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor() { }

  ngOnInit() {
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    var margin: any = {top: 66, right: 110, bottom: 20, left: 188},
    width = document.body.clientWidth - margin.left - margin.right,
    height = 340 - margin.top - margin.bottom,
    innerHeight = height - 2;

var devicePixelRatio = window.devicePixelRatio || 1;

var color = d3.scaleOrdinal()
  .range(["#5DA5B3","#D58323","#DD6CA7","#54AF52","#8C92E8","#E15E5A","#725D82","#776327","#50AB84","#954D56","#AB9C27","#517C3F","#9D5130","#357468","#5E9ACF","#C47DCB","#7D9E33","#DB7F85","#BA89AD","#4C6C86","#B59248","#D8597D","#944F7E","#D67D4B","#8F86C2"]);

var types = {
  "Number": {
    key: "Number",
    coerce: function(d) { return +d; },
    extent: d3.extent,
    within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
    defaultScale: d3.scaleLinear().range([innerHeight, 0])
  },
  "String": {
    key: "String",
    coerce: String,
    extent: function (data) { return data.sort(); },
    within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
    defaultScale: d3.scalePoint().range([0, innerHeight])
  },
  "Date": {
    key: "Date",
    coerce: function(d) { return new Date(d); },
    extent: d3.extent,
    within: function(d, extent, dim) { return extent[0] <= dim.scale(d) && dim.scale(d) <= extent[1]; },
    defaultScale: d3.scaleTime().range([0, innerHeight])
  }
};

var dimensions: any = [
  {
    key: "food_group",
    description: "Food Group",
    type: types["String"],
    axis: d3.axisLeft()
      .tickFormat(function(d,i) {
        return d;
      })
  },
  {
    key: "Total lipid (fat) (g)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Sugars, total (g)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Calcium, Ca (mg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Sodium, Na (mg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Phosphorus, P (mg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Potassium, K (mg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Thiamin (mg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Riboflavin (mg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Niacin (mg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Iron, Fe (mg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Magnesium, Mg (mg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Protein (g)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Zinc, Zn (mg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Vitamin B-6 (mg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Vitamin B-12 (mcg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Folic acid (mcg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Selenium, Se (mcg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Vitamin A, IU (IU)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Vitamin K (phylloquinone) (mcg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Vitamin C, total ascorbic acid (mg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Vitamin D (IU)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Cholesterol (mg)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Fiber, total dietary (g)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "Carbohydrate, by difference (g)",
    type: types["Number"],
    scale: d3.scaleSqrt().range([innerHeight, 0])
  },
  {
    key: "manufac_name",
    description: "Manufacturer",
    type: types["String"],
    axis: d3.axisRight()
      .tickFormat(function(d,i) {
        if (d == null) return "(null)";
        return i % 5 == 0 ? d.slice(0,22) : "";
      })
  }
];

var xscale = d3.scalePoint()
    .domain(d3.range(dimensions.length))
    .range([0, width]);

var yAxis = d3.axisLeft();

var container = d3.select("body").append("div")
    .attr("class", "parcoords")
    .style("width", width + margin.left + margin.right + "px")
    .style("height", height + margin.top + margin.bottom + "px");

var svg = container.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var canvas = container.append("canvas")
    .attr("width", width * devicePixelRatio)
    .attr("height", height * devicePixelRatio)
    .style("width", width + "px")
    .style("height", height + "px")
    .style("margin-top", margin.top + "px")
    .style("margin-left", margin.left + "px");

var ctx = canvas.node().getContext("2d");
ctx.globalCompositeOperation = 'darken';
ctx.globalAlpha = 0.15;
ctx.lineWidth = 1.5;
ctx.scale(devicePixelRatio, devicePixelRatio);

var output = d3.select("body").append("pre");

var axes = svg.selectAll(".axis")
    .data(dimensions)
  .enter().append("g")
    .attr("class", function(d) { return "axis " + d.key.replace(/ /g, "_"); })
    .attr("transform", function(d,i) { return "translate(" + xscale(i) + ")"; });

d3.csv("../src/Nutrients.csv", function(error, data) {
  if (error) {
    data= [
  {
    "id": 1001,
    "food_group_id": 100,
    "long_desc": "Butter, salted",
    "short_desc": "BUTTER,WITH SALT",
    "common_names": "",
    "manufac_name": "",
    "survey": "Y",
    "ref_desc": "",
    "refuse": 0,
    "sci_name": "",
    "nitrogen_factor": 6.38,
    "protein_factor": 4.27,
    "fat_factor": 8.79,
    "calorie_factor": 3.87,
    "Protein (g)": 0.85,
    "Total lipid (fat) (g)": 81.11,
    "Carbohydrate, by difference (g)": 0.06,
    "Ash (g)": 2.11,
    "Energy (kcal)": 717,
    "Alcohol, ethyl (g)": "",
    "Water (g)": 15.87,
    "Caffeine (mg)": "",
    "Theobromine (mg)": "",
    "Energy (kJ)": 3000,
    "Sugars, total (g)": 0.06,
    "Fiber, total dietary (g)": "",
    "Calcium, Ca (mg)": 24,
    "Iron, Fe (mg)": 0.02,
    "Magnesium, Mg (mg)": 2,
    "Phosphorus, P (mg)": 24,
    "Potassium, K (mg)": 24,
    "Sodium, Na (mg)": 643,
    "Zinc, Zn (mg)": 0.09,
    "Copper, Cu (mg)": "",
    "Fluoride, F (mcg)": 2.8,
    "Manganese, Mn (mg)": "",
    "Selenium, Se (mcg)": 1,
    "Vitamin A, IU (IU)": 2499,
    "Retinol (mcg)": 671,
    "Vitamin A, RAE (mcg)": 684,
    "Carotene, beta (mcg)": 158,
    "Carotene, alpha (mcg)": "",
    "Vitamin E (alpha-tocopherol) (mg)": 2.32,
    "Vitamin D (IU)": 60,
    "Vitamin D3 (cholecalciferol) (mcg)": 1.5,
    "Vitamin D (D2 + D3) (mcg)": 1.5,
    "Cryptoxanthin, beta (mcg)": "",
    "Lycopene (mcg)": "",
    "Lutein + zeaxanthin (mcg)": "",
    "Tocopherol, beta (mg)": "",
    "Tocopherol, gamma (mg)": "",
    "Tocopherol, delta (mg)": "",
    "Tocotrienol, alpha (mg)": "",
    "Tocotrienol, beta (mg)": "",
    "Tocotrienol, gamma (mg)": "",
    "Tocotrienol, delta (mg)": "",
    "Vitamin C, total ascorbic acid (mg)": "",
    "Thiamin (mg)": 0.005,
    "Riboflavin (mg)": 0.034,
    "Niacin (mg)": 0.042,
    "Pantothenic acid (mg)": 0.11,
    "Vitamin B-6 (mg)": 0.003,
    "Folate, total (mcg)": 3,
    "Vitamin B-12 (mcg)": 0.17,
    "Choline, total (mg)": 18.8,
    "Vitamin K (phylloquinone) (mcg)": 7,
    "Folic acid (mcg)": "",
    "Folate, food (mcg)": 3,
    "Folate, DFE (mcg)": 3,
    "Betaine (mg)": 0.3,
    "Tryptophan (g)": 0.012,
    "Threonine (g)": 0.038,
    "Isoleucine (g)": 0.051,
    "Leucine (g)": 0.083,
    "Lysine (g)": 0.067,
    "Methionine (g)": 0.021,
    "Cystine (g)": 0.008,
    "Phenylalanine (g)": 0.041,
    "Tyrosine (g)": 0.041,
    "Valine (g)": 0.057,
    "Arginine (g)": 0.031,
    "Histidine (g)": 0.023,
    "Alanine (g)": 0.029,
    "Aspartic acid (g)": 0.064,
    "Glutamic acid (g)": 0.178,
    "Glycine (g)": 0.018,
    "Proline (g)": 0.082,
    "Serine (g)": 0.046,
    "Vitamin E, added (mg)": "",
    "Vitamin B-12, added (mcg)": "",
    "Cholesterol (mg)": 215,
    "Fatty acids, total trans (g)": 3.278,
    "Fatty acids, total saturated (g)": 51.368,
    "4:0 (g)": 3.226,
    "6:0 (g)": 2.007,
    "8:0 (g)": 1.19,
    "10:0 (g)": 2.529,
    "12:0 (g)": 2.587,
    "14:0 (g)": 7.436,
    "16:0 (g)": 21.697,
    "18:0 (g)": 9.999,
    "20:0 (g)": 0.138,
    "18:1 undifferentiated (g)": 19.961,
    "18:2 undifferentiated (g)": 2.728,
    "18:3 undifferentiated (g)": 0.315,
    "20:4 undifferentiated (g)": "",
    "22:6 n-3 (DHA) (g)": "",
    "16:1 undifferentiated (g)": 0.961,
    "18:4 (g)": "",
    "20:1 (g)": 0.1,
    "20:5 n-3 (EPA) (g)": "",
    "22:1 undifferentiated (g)": "",
    "22:5 n-3 (DPA) (g)": "",
    "Stigmasterol (mg)": "",
    "Campesterol (mg)": "",
    "Beta-sitosterol (mg)": 4,
    "Fatty acids, total monounsaturated (g)": 21.021,
    "Fatty acids, total polyunsaturated (g)": 3.043,
    "17:0 (g)": 0.56,
    "18:1 t (g)": 2.982,
    "18:2 i (g)": 0.296,
    "18:2 CLAs (g)": 0.267,
    "16:1 c (g)": 0.961,
    "18:1 c (g)": 16.978,
    "18:2 n-6 c,c (g)": 2.166,
    "Fatty acids, total trans-monoenoic (g)": 2.982,
    "Fatty acids, total trans-polyenoic (g)": 0.296,
    "18:3 n-3 c,c,c (ALA) (g)": 0.315,
    "Starch (g)": "",
    "Sucrose (g)": "",
    "Glucose (dextrose) (g)": "",
    "Fructose (g)": "",
    "Lactose (g)": "",
    "Maltose (g)": "",
    "Adjusted Protein (g)": "",
    "Galactose (g)": "",
    "Vitamin D2 (ergocalciferol) (mcg)": "",
    "Menaquinone-4 (mcg)": "",
    "Dihydrophylloquinone (mcg)": "",
    "Hydroxyproline (g)": "",
    "22:0 (g)": "",
    "14:1 (g)": "",
    "Phytosterols (mg)": "",
    "15:0 (g)": "",
    "24:0 (g)": "",
    "16:1 t (g)": "",
    "22:1 t (g)": "",
    "18:2 t not further defined (g)": "",
    "18:2 t,t (g)": "",
    "24:1 c (g)": "",
    "20:2 n-6 c,c (g)": "",
    "22:1 c (g)": "",
    "18:3 n-6 c,c,c (g)": "",
    "17:1 (g)": "",
    "20:3 undifferentiated (g)": "",
    "13:0 (g)": "",
    "15:1 (g)": "",
    "20:3 n-3 (g)": "",
    "20:3 n-6 (g)": "",
    "20:4 n-6 (g)": "",
    "18:3i (g)": "",
    "21:5 (g)": "",
    "22:4 (g)": "",
    "18:1-11 t (18:1t n-7) (g)": ""
  },
  {
    "id": 1002,
    "food_group_id": 100,
    "long_desc": "Butter, whipped, with salt",
    "short_desc": "BUTTER,WHIPPED,WITH SALT",
    "common_names": "",
    "manufac_name": "",
    "survey": "Y",
    "ref_desc": "",
    "refuse": 0,
    "sci_name": "",
    "nitrogen_factor": 6.38,
    "protein_factor": 4.27,
    "fat_factor": 8.79,
    "calorie_factor": 3.87,
    "Protein (g)": 0.85,
    "Total lipid (fat) (g)": 81.11,
    "Carbohydrate, by difference (g)": 0.06,
    "Ash (g)": 2.11,
    "Energy (kcal)": 717,
    "Alcohol, ethyl (g)": 0,
    "Water (g)": 15.87,
    "Caffeine (mg)": 0,
    "Theobromine (mg)": 0,
    "Energy (kJ)": 2999,
    "Sugars, total (g)": 0.06,
    "Fiber, total dietary (g)": 0,
    "Calcium, Ca (mg)": 24,
    "Iron, Fe (mg)": 0.16,
    "Magnesium, Mg (mg)": 2,
    "Phosphorus, P (mg)": 23,
    "Potassium, K (mg)": 26,
    "Sodium, Na (mg)": 659,
    "Zinc, Zn (mg)": 0.05,
    "Copper, Cu (mg)": 0.016,
    "Fluoride, F (mcg)": 2.8,
    "Manganese, Mn (mg)": 0.004,
    "Selenium, Se (mcg)": 1,
    "Vitamin A, IU (IU)": 2499,
    "Retinol (mcg)": 671,
    "Vitamin A, RAE (mcg)": 684,
    "Carotene, beta (mcg)": 158,
    "Carotene, alpha (mcg)": 0,
    "Vitamin E (alpha-tocopherol) (mg)": 2.32,
    "Vitamin D (IU)": 60,
    "Vitamin D3 (cholecalciferol) (mcg)": 1.5,
    "Vitamin D (D2 + D3) (mcg)": 1.5,
    "Cryptoxanthin, beta (mcg)": 0,
    "Lycopene (mcg)": 0,
    "Lutein + zeaxanthin (mcg)": 0,
    "Tocopherol, beta (mg)": "",
    "Tocopherol, gamma (mg)": "",
    "Tocopherol, delta (mg)": "",
    "Tocotrienol, alpha (mg)": "",
    "Tocotrienol, beta (mg)": "",
    "Tocotrienol, gamma (mg)": "",
    "Tocotrienol, delta (mg)": "",
    "Vitamin C, total ascorbic acid (mg)": 0,
    "Thiamin (mg)": 0.005,
    "Riboflavin (mg)": 0.034,
    "Niacin (mg)": 0.042,
    "Pantothenic acid (mg)": 0.11,
    "Vitamin B-6 (mg)": 0.003,
    "Folate, total (mcg)": 3,
    "Vitamin B-12 (mcg)": 0.13,
    "Choline, total (mg)": 18.8,
    "Vitamin K (phylloquinone) (mcg)": 7,
    "Folic acid (mcg)": 0,
    "Folate, food (mcg)": 3,
    "Folate, DFE (mcg)": 3,
    "Betaine (mg)": 0.3,
    "Tryptophan (g)": 0.012,
    "Threonine (g)": 0.038,
    "Isoleucine (g)": 0.051,
    "Leucine (g)": 0.083,
    "Lysine (g)": 0.067,
    "Methionine (g)": 0.021,
    "Cystine (g)": 0.008,
    "Phenylalanine (g)": 0.041,
    "Tyrosine (g)": 0.041,
    "Valine (g)": 0.057,
    "Arginine (g)": 0.031,
    "Histidine (g)": 0.023,
    "Alanine (g)": 0.029,
    "Aspartic acid (g)": 0.064,
    "Glutamic acid (g)": 0.178,
    "Glycine (g)": 0.018,
    "Proline (g)": 0.082,
    "Serine (g)": 0.046,
    "Vitamin E, added (mg)": 0,
    "Vitamin B-12, added (mcg)": 0,
    "Cholesterol (mg)": 219,
    "Fatty acids, total trans (g)": "",
    "Fatty acids, total saturated (g)": 50.489,
    "4:0 (g)": 2.63,
    "6:0 (g)": 1.557,
    "8:0 (g)": 0.906,
    "10:0 (g)": 2.034,
    "12:0 (g)": 2.277,
    "14:0 (g)": 8.157,
    "16:0 (g)": 21.334,
    "18:0 (g)": 9.829,
    "20:0 (g)": "",
    "18:1 undifferentiated (g)": 20.405,
    "18:2 undifferentiated (g)": 1.832,
    "18:3 undifferentiated (g)": 1.18,
    "20:4 undifferentiated (g)": 0,
    "22:6 n-3 (DHA) (g)": 0,
    "16:1 undifferentiated (g)": 1.816,
    "18:4 (g)": 0,
    "20:1 (g)": 0,
    "20:5 n-3 (EPA) (g)": 0,
    "22:1 undifferentiated (g)": 0,
    "22:5 n-3 (DPA) (g)": 0,
    "Stigmasterol (mg)": "",
    "Campesterol (mg)": "",
    "Beta-sitosterol (mg)": "",
    "Fatty acids, total monounsaturated (g)": 23.426,
    "Fatty acids, total polyunsaturated (g)": 3.012,
    "17:0 (g)": "",
    "18:1 t (g)": "",
    "18:2 i (g)": "",
    "18:2 CLAs (g)": "",
    "16:1 c (g)": "",
    "18:1 c (g)": "",
    "18:2 n-6 c,c (g)": "",
    "Fatty acids, total trans-monoenoic (g)": "",
    "Fatty acids, total trans-polyenoic (g)": "",
    "18:3 n-3 c,c,c (ALA) (g)": "",
    "Starch (g)": "",
    "Sucrose (g)": "",
    "Glucose (dextrose) (g)": "",
    "Fructose (g)": "",
    "Lactose (g)": "",
    "Maltose (g)": "",
    "Adjusted Protein (g)": "",
    "Galactose (g)": "",
    "Vitamin D2 (ergocalciferol) (mcg)": "",
    "Menaquinone-4 (mcg)": "",
    "Dihydrophylloquinone (mcg)": "",
    "Hydroxyproline (g)": "",
    "22:0 (g)": "",
    "14:1 (g)": "",
    "Phytosterols (mg)": "",
    "15:0 (g)": "",
    "24:0 (g)": "",
    "16:1 t (g)": "",
    "22:1 t (g)": "",
    "18:2 t not further defined (g)": "",
    "18:2 t,t (g)": "",
    "24:1 c (g)": "",
    "20:2 n-6 c,c (g)": "",
    "22:1 c (g)": "",
    "18:3 n-6 c,c,c (g)": "",
    "17:1 (g)": "",
    "20:3 undifferentiated (g)": "",
    "13:0 (g)": "",
    "15:1 (g)": "",
    "20:3 n-3 (g)": "",
    "20:3 n-6 (g)": "",
    "20:4 n-6 (g)": "",
    "18:3i (g)": "",
    "21:5 (g)": "",
    "22:4 (g)": "",
    "18:1-11 t (18:1t n-7) (g)": ""
  }];
  }

  // shuffle the data!
  data = d3.shuffle(data);

  data.forEach(function(d) {
    dimensions.forEach(function(p) {
      d[p.key] = !d[p.key] ? null : p.type.coerce(d[p.key]);
    });

    // truncate long text strings to fit in data table
    for (var key in d) {
      if (d[key] && d[key].length > 35) d[key] = d[key].slice(0,36);
    }
  });

  // type/dimension default setting happens here
  dimensions.forEach(function(dim) {
    if (!("domain" in dim)) {
      // detect domain using dimension type's extent function
      dim.domain = d3_functor(dim.type.extent)(data.map(function(d) { return d[dim.key]; }));
    }
    if (!("scale" in dim)) {
      // use type's default scale for dimension
      dim.scale = dim.type.defaultScale.copy();
    }
    dim.scale.domain(dim.domain);
  });

  var render: any = renderQueue(draw).rate(50);

  ctx.clearRect(0,0,width,height);
  ctx.globalAlpha = d3.min([0.85/Math.pow(data.length,0.3),1]);
  render(data);

  axes.append("g")
      .each(function(d) {
        var renderAxis = "axis" in d
          ? d.axis.scale(d.scale)  // custom axis
          : yAxis.scale(d.scale);  // default axis
        d3.select(this).call(renderAxis);
      })
    .append("text")
      .attr("class", "title")
      .attr("text-anchor", "start")
      .text(function(d) { return "description" in d ? d.description : d.key; });

  // Add and store a brush for each axis.
  axes.append("g")
      .attr("class", "brush")
      .each(function(d) {
        d3.select(this).call(d.brush = d3.brushY()
          .extent([[-10,0], [10,height]])
          .on("start", brushstart)
          .on("brush", brush)
          .on("end", brush)
        )
      })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);

  d3.selectAll(".axis.food_group .tick text")
    .style("fill", color);

  output.text(d3.tsvFormat(data.slice(0,24)));

  function project(d) {
    return dimensions.map(function(p,i) {
      // check if data element has property and contains a value
      if (
        !(p.key in d) ||
        d[p.key] === null
      ) return null;

      return [xscale(i),p.scale(d[p.key])];
    });
  };

  function draw(d) {
    ctx.strokeStyle = color(d.food_group);
    ctx.beginPath();
    var coords = project(d);
    coords.forEach(function(p,i) {
      // this tricky bit avoids rendering null values as 0
      if (p === null) {
        // this bit renders horizontal lines on the previous/next
        // dimensions, so that sandwiched null values are visible
        if (i > 0) {
          var prev = coords[i-1];
          if (prev !== null) {
            ctx.moveTo(prev[0],prev[1]);
            ctx.lineTo(prev[0]+6,prev[1]);
          }
        }
        if (i < coords.length-1) {
          var next = coords[i+1];
          if (next !== null) {
            ctx.moveTo(next[0]-6,next[1]);
          }
        }
        return;
      }

      if (i == 0) {
        ctx.moveTo(p[0],p[1]);
        return;
      }

      ctx.lineTo(p[0],p[1]);
    });
    ctx.stroke();
  }

  function brushstart() {
    d3.event.sourceEvent.stopPropagation();
  }

  // Handles a brush event, toggling the display of foreground lines.
  function brush() {
    render.invalidate();

    var actives = [];
    svg.selectAll(".axis .brush")
      .filter(function(d) {
        return d3.brushSelection(this);
      })
      .each(function(d) {
        actives.push({
          dimension: d,
          extent: d3.brushSelection(this)
        });
      });

    var selected = data.filter(function(d) {
      if (actives.every(function(active) {
          var dim = active.dimension;
          // test if point is within extents for each active brush
          return dim.type.within(d[dim.key], active.extent, dim);
        })) {
        return true;
      }
    });

    // show ticks for active brush dimensions
    // and filter ticks to only those within brush extents
    /*
    svg.selectAll(".axis")
        .filter(function(d) {
          return actives.indexOf(d) > -1 ? true : false;
        })
        .classed("active", true)
        .each(function(dimension, i) {
          var extent = extents[i];
          d3.select(this)
            .selectAll(".tick text")
            .style("display", function(d) {
              var value = dimension.type.coerce(d);
              return dimension.type.within(value, extent, dimension) ? null : "none";
            });
        });

    // reset dimensions without active brushes
    svg.selectAll(".axis")
        .filter(function(d) {
          return actives.indexOf(d) > -1 ? false : true;
        })
        .classed("active", false)
        .selectAll(".tick text")
          .style("display", null);
    */

    ctx.clearRect(0,0,width,height);
    ctx.globalAlpha = d3.min([0.85/Math.pow(selected.length,0.3),1]);
    render(selected);

    output.text(d3.tsvFormat(selected.slice(0,24)));
  }
});

function d3_functor(v) {
  return typeof v === "function" ? v : function() { return v; };
};
  }

  updateChart() {
    // update scales & axis
    this.xScale.domain(this.data.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    this.colors.domain([0, this.data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    let update = this.chart.selectAll('.bar')
      .data(this.data);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(d[1]))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.height - this.yScale(d[1]))
      .style('fill', (d, i) => this.colors(i));

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d, i) => this.colors(i))
      .transition()
      .delay((d, i) => i * 10)
      .attr('y', d => this.yScale(d[1]))
      .attr('height', d => this.height - this.yScale(d[1]));
  }
}
