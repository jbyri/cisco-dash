# Chart Components
Below is a description of all charting components, and some details about their
specific rendering logic.

### Currently selected charting framwork
ChartJS

## Currently Supported Chart Components
None yet, check back later.

## In Development
Chart components that are currently in development. Check back soon for support.

### BarChartComponent
Displays a set of labels and data points in Bar Chart format.
Allows different charting configurations (i.e. stacked barchart)

## Future
### LineChartComponent
Displays a set of lines connecting labels and datapoints in Line Chart format.0

### AreaChartComponent
Display a set of labels and data points in an Area Chart format.

### DonutChartComponent
Displays a set of labels and datapoints in Donut Chart Format.

## Adding New Chart Components
Follow these steps to add a new chart component.


1. Create your chart component within the app/components/ui/chart directory, along with all of its styles, tests, and templates.
    1. Insure you add your component to the 'entryComponents' in app.module.ts.
    2. Add your chart options to chart-options.json
    3. Add your chart data sets to the customer data file (insure all customers have entries for this new data set.)
    4. **Dont forget to add your component to app.module.ts**
2. While in development, add your chart and a brief description to the "In Development" Heading.
3. Once complete, move your heading and description under the "Currently Supported Chart Components" heading, and fill out a more detailed description of the component.
4. If a new chart is to be created and not yet in progress, add a heading and a single sentence description to the "Future" heading.
