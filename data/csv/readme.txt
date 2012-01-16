Original data set CSV files have been modified as follows to make headers consistent across all files:

Most Profitable Hollywood Stories - US 2007.csv
-----------------------------------------------

1c1,3
< exclude,Film,Lead Studio,Rotten Tomatoes,Audience Score,Story,Genre,Number of Theatres in Opening Weekend,Box Office Average per Cinema,Domestic Gross,Foreign Gross,Worldwide Gross,Budget,Market Profitability,Opening Weekend,Oscar,Bafta,Source,,Domestic Gross,Foreign Gross,Worldwide,Budget
---
> exclude,Film ,Major Studio,Rotten Tomatoes,Audience Score,Story,Genre,Number of Theatres in Opening Weekend,Box Office Average per Cinema,Domestic Gross,Foreign Gross,Worldwide Gross,Budget,Market Profitability,Opening Weekend,Oscar,Bafta,Source,,Domestic Gross,Foreign Gross,Worldwide,Budget
> ,,,,,,,,($),($m),($m),($m),($m),% of budget recovered,($m),,,all the-numbers.com,,($),($),($),($)
> ,Average,,51,,,,,,86.10,105.38,191.47,62.93,360.82%,25.78


Most Profitable Hollywood Stories - US 2008.csv
-----------------------------------------------

1c1,3
< exclude,Film,Lead Studio,Rotten Tomatoes,Audience Score,Story,Genre,Number of Theatres in Opening Weekend,Box Office Average per Cinema,Domestic Gross,Foreign Gross,Worldwide Gross,Budget,Market Profitability,Opening Weekend,Oscar,Bafta,Source,,Domestic Gross,Foreign Gross,worldwide,Budget,budget 
---
> exclude,Film,Major Studio,Rotten Tomatoes,Audience Score,Story,Genre,Number of Theatres in Opening Weekend,Box Office Average per Cinema,Domestic Gross,Foreign Gross,Worldwide Gross,Budget ,Market Profitability,Opening Weekend,Oscar,Bafta,Source,,Domestic Gross,Foreign Gross,worldwide,Budget,budget 
> ,,,,,,,,($),($m),($m),($m),,% of budget recovered,,,,all boxofficemojo.com except otherwise stated,,($m),($m),($m),($m)
> ,Average,,46,,,,,,59.62,75.72,124.34,50.19,3.36,19.60


Most Profitable Hollywood Stories - US 2009.csv
-----------------------------------------------

1c1,3
< exclude,Film,Lead Studio,Rotten Tomatoes,Audience Score,Story,Genre,Number of Theatres in Opening Weekend,Box Office Average per Cinema,Domestic Gross,Foreign Gross,Worldwide Gross,Budget,Market Profitability,Opening Weekend,Oscar,Bafta,Source
---
> ,Film ,Lead Studio,Rotten Tomatoes,Audience Score,Story,Genre,Number of Theatres in Opening Weekend,Box Office Average per Cinema,Domestic Gross,Foreign Gross,Worldwide Gross,Budget,Market Profitability,Opening Weekend,Oscar,Bafta,Source
> ,,,,,,,,($),($m),($m),($m),($m),% of budget recovered,($m)
> ,Average,,47,,,,,,73.59,86.53,160.55,53.63,87.38,21.76

Most Profitable Hollywood Stories - US 2010.csv
-----------------------------------------------

1c1,3
< exclude,Film,Lead Studio,Rotten Tomatoes,Audience Score,Story,Genre,Number of Theatres in Opening Weekend,Box Office Average per Cinema,Domestic Gross,Foreign Gross,Worldwide Gross,Budget,Market Profitability,Opening Weekend,Oscar,Bafta,Source
---
> exclude,Film ,Lead Studio,Rotten Tomatoes,Audience  score,Story,Genre,Number of Theatres in Opening Weekend (US),Box Office Average per Cinema,Domestic Gross,Foreign Gross,Worldwide Gross,Budget,Proftitability,Opening Weekend,Oscar,Bafta,Source
> ,,,,,,,,($),($m),($m),($m),($m),% of budget recovered,($m)
> ,Average,,49,57,,,"2,619","8,202",67,85,152,55,363.48%,21

Most Profitable Hollywood Stories - US 2011.csv
-----------------------------------------------

1c1,2
< exclude,Film,Lead Studio,Rotten Tomatoes,Audience Score,Story,Genre,Number of Theatres in Opening Weekend,Box Office Average per Cinema,Domestic Gross,Foreign Gross,Worldwide Gross,Budget,Market Profitability,Opening Weekend,Oscar,Bafta,Source
---
> exclude,Film ,Lead Studio,Rotten Tomatoes %,Audience  score %,Story,Genre,Number of Theatres in US Opening Weekend,Box Office Average per US Cinema (Opening Weekend),Domestic Gross,Foreign Gross,Worldwide Gross,Budget,Profitability,Opening Weekend,Oscar,Bafta,Source
> ,,,,,,,,($),($m),($m),($m),($m),% of budget recovered,($m)
