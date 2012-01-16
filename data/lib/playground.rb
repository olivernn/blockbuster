# films.group_by(&:genre).map{|k,v| [k,v.inject(0){|m,f|m+f.number_of_theatres_in_opening_weekend}/v.size]}.sort {|a,b| b.last <=> a.last}

class Array
  def method_missing(m, *args, &block)
    super unless m.to_s.match(/^by_/)
    self
      .group_by { |film| film.send(m.to_s.gsub('by_', '').to_sym) }
      .map { |genre, films| [genre, block.call(films)] }
      .sort {|a,b| b.last <=> a.last}
  end

  def sum
    inject(0) do |memo, num|
      memo + num
    end
  end

  def mean
    sum / size
  end
end