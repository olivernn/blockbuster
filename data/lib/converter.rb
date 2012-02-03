require 'csv'
require 'json'

module Converter

  FILES = { 
    '2007' => './data/csv/2007.new.csv',
    '2008' => './data/csv/2008.new.csv',
    '2009' => './data/csv/2009.new.csv',
    '2010' => './data/csv/2010.new.csv',
    '2011' => './data/csv/2011.new.csv'
  }

  def self.generate
    all_films = []

    FILES.each do |year, path|
      puts "**** Generating Films in #{year}"
      CSV.open path, headers: true, skip_blanks: true, force_quotes: true do |csv|
        films = csv.map do |row|
          hash = row.to_hash

          normalized_hash = hash.inject({}) do |memo, (key, val)|
            memo[key.downcase.gsub(/\s+/, '_')] = val if key
            memo
          end

          normalized_hash['year'] = year
          puts "Processing #{normalized_hash['film']}"
          Film.new(normalized_hash)
        end

        all_films.push(films)
      end
    end

    File.open 'data.new.json', 'w' do |file|
      file.write JSON.dump(all_films.flatten.map(&:to_json))
    end
  end
end