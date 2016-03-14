$ ->

  window.actions = {

    overview: ->
      window.actions.property()
      window.actions.stats()

    month_pdf: ->
      window.generate.month_pdf_report()

    property: ->
      window.reapit_vendor.getPropertyView().done (property_view) ->
        property_view.setTemplate '#tracker-intro-template'
        property_view.setElement '#tracker-intro'
        property_view.render()

    stats: ->
      calls = []
      calls.push( window.reapit_vendor.getOffersView() )
      calls.push( window.reapit_vendor.getMarketingStatsView() )
      $.when(calls...).done (data...) ->
        offer_stats_view = data[0]
        stats_view = data[1]

        stats_view.setTemplate '#marketing-stats-template'
        stats_view.setElement '#marketing-stats'
        offer_stats_view.setTemplate '#offer-stats-template'
        offer_stats_view.setElement '#offer-stats'

        stats_view.render()
        offer_stats_view.render()


    offers: ->
      window.reapit_vendor.getOffersView().done (viewings_view) ->
        viewings_view.setTemplate '#offers-template'
        viewings_view.setElement '#offers-view'
        viewings_view.render()

    viewings: ->
      viewings_data = window.reapit_vendor.getViewingsView().done (viewings_view) ->
        viewings_view.setTemplate '#viewings-template'
        viewings_view.setElement '#viewings-view'
        viewings_view.render()
      viewings_data.done (viewings_view) =>
        ctx = $("#viewing-chart").get(0).getContext("2d")
        window.graph_helpers.viewingsPieChart(viewings_view, ctx)

    marketing: ->
      core_stats = window.reapit_vendor.getMarketingStatsView().done (stats_view) ->
        stats_view.setTemplate '#marketing-tab-template'
        stats_view.setElement '#marketing-tab'
        stats_view.render()
        window.graph_helpers.init_marketing_graph()
      core_stats.done ->
        $('#interval_select').submit (e) ->
          window.graph_helpers.update_marketing_graph($('#interval_select select').val())
          e.preventDefault()

    profile: ->
      'hello'

    logged_in: ->
      actions.overview()
      $('#overview-btn').trigger('click')


  }

  window.graph_helpers = {
    viewingsPieChart: (viewings_view, ctx, options = {}) ->
      colors = ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 255, 1)', 'rgba(0, 0, 255, 1)', 'rgba(255, 255, 0, 1)', 'rgba(0, 128, 0, 1)', 'rgba(128, 128, 128, 1)', 'rgba(128, 0, 128, 1)', 'rgba(64, 173, 57, 1)', 'rgba(255, 192, 203, 1)', 'rgba(191, 139, 21, 1)']
      reasons = viewings_view.collection
      grouped =  _.pairs(_.countBy(reasons.pluck('followup'), _.identity))
      data = _.map grouped, (val, i) =>
        name = val[0]
        name = "Unspecified" if name == ""
        {
          value: val[1],
          color: colors[i],
          highlight: "#FF5A5E",
          label: name
        }

      new Chart(ctx).Pie(data, options)

    init_marketing_graph: ->
      ctx = $("#intrest-chart").get(0).getContext("2d");
      @marketing_stats_graph = new Chart(ctx)
      @_set_marketing_stats_data('week')

    update_marketing_graph: (interval) ->
      $("#marketing-graph-updating").show()
      $("#marketing-graph-updating").css('display', 'inline-block');
      $('#interval_select').find('button').prop('disabled', true);
      @_set_marketing_stats_data(interval)

    _set_marketing_stats_data: (view) ->
      from = @_from_date_for(view)
      interval = @_interval_for(view)

      query_types = ['floorplan', 'view', 'pdf']
      display_params =[
        {
          label: 'Floorplan Downloads', fillColor: "rgba(220,220,220,0)", strokeColor: "rgba(42, 203, 44, 1)", pointColor: "rgba(42, 203, 44, 1)",
          pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "rgba(220,220,220,1)"
        },{
          label: 'Website Views', fillColor: "rgba(220,220,220,0)", strokeColor: "rgba(64, 143, 179, 1)", pointColor: "rgba(64, 143, 179, 1)",
          pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "rgba(220,220,220,1)"
        },{
          label: 'PDF Downloads', fillColor: "rgba(220,220,220,0)", strokeColor: "rgba(42, 92, 253, 1)", pointColor: "rgba(42, 92, 253, 1)",
          pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "rgba(220,220,220,1)"
        }
      ]

      datasets = _.map query_types, (value) ->
        window.reapit_vendor.getPropertyUserInteractions(value, interval, from, moment().format() )

      $.when(datasets...).done (data...) =>
        labels = _.map data[0].get('values'), (d) ->
          if interval == 'day'
            moment(d['end']).format('D MMM');
          else
            moment(d['start']).format('D MMM');

        data = _.map data, (vals, i) ->
          o = display_params[i]
          o.data = _.map vals.get('values'), (v) ->
            v.quantity
          o
        @_update_graph_data(data, labels)

    _update_graph_data: (data, labels) ->
      if !@marketing_stats_graph
        @init_marketing_graph()

      $("#marketing-graph-loading").hide()
      $("#marketing-graph-updating").hide()
      $('#interval_select').find('button').prop('disabled', false);

      if window.current_marketing_graph
        window.current_marketing_graph.destroy()

      graph = @marketing_stats_graph.Line({
        'labels': labels,
        'datasets': data
      }, {
        'legendTemplate' : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
      })

      window.current_marketing_graph = graph
      $("#intrest-chart-leg").html graph.generateLegend();

    _interval_for: (view) ->
      interval = switch
        when view == 'week' then 'day'
        when view == 'month' then 'week'
        when view == 'quarter' then 'month'
        else 'day'
      interval

    _from_date_for: (view) ->
      from = switch
        when view == 'week' then moment().subtract(1, 'weeks')
        when view == 'month' then moment().subtract(1, 'months')
        when view == 'quarter' then moment().subtract(3, 'months')
        else moment().subtract(1, 'weeks')
      from.format()

  }

  $('#tracker-main').easyResponsiveTabs({
    tabidentify:'tracker-tab'
    activate: (a) ->
      console.log(@)
      actions[@.innerHTML.toLowerCase()].call()
  });

  $('#monthlyPdf').click ->
    window.actions.month_pdf()

  $('#offer-stats').click ->
    $('#offers-btn').trigger('click')

  $('#marketing-stats').on('click', '.t-viewings', () ->
    $('#viewings-btn').trigger('click')
  )

  $('#marketing-stats').on('click', '.t-details', () ->
    $('#marketing-btn').trigger('click')
  )

  $('#marketing-stats').on('click', '.t-page-v', () ->
    $('#marketing-btn').trigger('click')
  )



  #$('ul.tabs li').click (event)->
  #  $('ul.tabs li').each (i, el) ->
#      el = $(el)
  #    el.removeClass('t-active')
#      container = el.attr('id').replace('-btn', '-cont')#
    #  $('#' + container).hide()
    #el = $(event.target)
    #container = el.attr('id').replace('-btn', '-cont')
    #el.addClass('t-active')
    #console.log(el.attr('id').replace('-btn', ''))
    #actions[el.attr('id').replace('-btn', '')].call()
    #$('#' + container).show()


  #render_vendor = ->
  #  console.log 'vendor'
  #  window.reapit_vendor.getVendorView().done (vendor_view) ->
  #    vendor_view.setTemplate '#tracker-intro-template'
  #    vendor_view.setElement '#tracker-intro'
  #    vendor_view.render()

  #render_property = ->
  #  window.reapit_vendor.getPropertyView().done (property_view) ->
  #    property_view.setTemplate '#tracker-intro-template'
  #    property_view.setElement '#tracker-intro'
  #    property_view.render()

  #render_stats = ->
  #  offer_stats()
  #  window.reapit_vendor.getMarketingStatsView().done (stats_view) ->
  #    stats_view.setTemplate '#marketing-stats-template'
  #    stats_view.setElement '#marketing-stats'
  #    stats_view.render()

  #offer_stats = ->
  #  console.log 'offer'
  #  #window.reapit_vendor.getVendor().done (vendor) ->
  #    ##set vendor here somehow
  #  window.reapit_vendor.getOffersView().done (stats_view) ->
  #    stats_view.setTemplate '#offer-stats-template'
  #    stats_view.setElement '#offer-stats'
  #    stats_view.render()

  $('#tracker-login form').submit (event) ->

    property_id = "klrrps-" + $('#property_id').val()
    password = $('#password').val()

    window.reapit_vendor = ReapitVendor.init(
      wsdl: 'http://karltatler.reapitcloud.com/webservice/index.php/'
      property_id: property_id
      password: password)

    window.reapit_vendor.login().fail(->
      alert 'could not log you in'
      return
    ).done ->
      $('#tracker-login').hide()
      $('#tracker-body').show()
      window.actions.logged_in()
    event.preventDefault()
    return
  return
