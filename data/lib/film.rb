require 'ostruct'
require 'chronic_duration'

class Film < OpenStruct

  def initialize(hash)
    imdb = ImdbData.fetch(hash['film'], hash['year'])
    super(hash.merge(imdb))
  end

  def to_json
    {
      audience_score: audience_score.to_i,
      rotten_tomatoes: rotten_tomatoes.to_i,
      baftas: baftas,
      oscars: oscars,
      box_office_average_per_cinema: box_office_average_per_cinema.to_i,
      budget: normalized_budget,
      domestic_gross: normalized_domestic_gross,
      foreign_gross: normalized_foreign_gross,
      worldwide_gross: worldwide_gross.to_f,
      title: film,
      genre: genre,
      story: story,
      lead_studio: lead_studio,
      market_profitability: normalized_profitability,
      number_of_theatres_in_opening_weekend: number_of_theatres_in_opening_weekend.to_i,
      year: year.to_i,
      release_date: released,
      release_year_day: release_year_day,
      actors: all_actors,
      director: director,
      writer: writer,
      poster_url: poster,
      runtime: runtime_seconds,
      rated: rated
    }
  end

  private

  [:bafta, :oscar].each do |method_name|
    define_method "#{method_name}s" do
      self.send(method_name).split(',').map(&:strip) if self.send(method_name)
    end
  end

  [:budget, :domestic_gross, :foreign_gross].each do |method_name|
    define_method "normalized_#{method_name}" do
      value = send(method_name)
      return 0.0 if value.nil?
      value.size >= 6 ? value.gsub('$','').to_f / 1000000 : value.gsub('$','').to_f
    end
  end

  def normalized_profitability
    return 0.0 if market_profitability.nil?

    if market_profitability == "11,420.00"
      market_profitability.to_f
    elsif market_profitability.match(/%$/)
      market_profability.to_f
    else
      market_profability.to_f * 100
    end
  end

  def runtime_seconds
    ChronicDuration.parse(runtime) unless runtime.nil?
  rescue
    nil
  end

  def all_actors
    actors.split(',').map(&:strip) if actors
  end

  def release_date
    Date.parse(released).to_s unless released.nil?
  rescue
    nil
  end

  def release_year_day
    Date.parse(released).yday unless released.nil?
  rescue
    nil
  end
end