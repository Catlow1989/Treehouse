$ ->

  window.generate = {

    month_pdf_report: ->
      self = @

      cover =  document.createElement("div")
      p = document.createElement('p')
      text = document.createTextNode('Generating PDF report, please wait...')
      document.body.appendChild(cover)
      cover.appendChild(p)
      p.appendChild(text)
      cover.setAttribute('style', 'width: 100%; height: 100%; position: fixed; top: 0; left: 0; background-color: rgba(255, 255, 255, .6); z-index: 9999;')
      p.setAttribute('style', 'display: inline-block; position: absolute; top: 400px; left: 50%; font-size: 20px; transform: translateX(-50%); color: #222')

      calls = []
      calls.push( window.reapit_vendor.getProperty() )
      calls.push( window.reapit_vendor.getVendor() )
      calls.push( window.reapit_vendor.getMarketingStats() )
      calls.push( window.reapit_vendor.getOffers() )
      calls.push( window.reapit_vendor.getViewings() )
      calls.push( window.reapit_vendor.getPropertyUserInteractions('view', 'month', moment().subtract(3, 'months').format(), moment().format() ) )
      calls.push( window.reapit_vendor.getPropertyUserInteractions('floorplan', 'month', moment().subtract(3, 'months').format(), moment().format() ) )
      calls.push( window.reapit_vendor.getPropertyUserInteractions('pdf', 'month', moment().subtract(3, 'months').format(), moment().format() ) )
      calls.push( window.reapit_vendor.getViewingsView() )

      $.when(calls...).done (data...) ->
        document.body.removeChild(cover)

        property = data[0]
        vendor = data[1]
        marketingStats = data[2]
        offers = data[3]
        viewings = data[4]
        userInteractionsPageViews = data[5]
        userInteractionsFloorplans = data[6]
        userInteractionsPdfDownloads = data[7]
        viewingsView = data[8]

        #210 × 297
        doc = new jsPDF();

        logoData = 'data:image/png;base64,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'
        doc.addImage(logoData, 'PNG', 20, 15, 40, 20)

        doc.setFont('Helvetica', 'Bold')
        doc.setLineWidth(0.4)

        doc.setFontSize(22);
        #doc.text(20, 20, 'Karl Tatler');

        doc.setFontSize(18);
        doc.text(20, 50, "Monthly Vendor report for #{property.get('address1')}");
        doc.line(20, 53, 190, 53);

        doc.setFontSize(16);
        doc.text(20, 70, "Your Details");
        doc.line(20, 73, 190, 73);

        doc.setFontSize(10);

        doc.setFont('Helvetica', 'Oblique')
        doc.text(20, 79, "The following contact details are currently held on our database");
        doc.setLineWidth(0.1)
        doc.line(20, 83, 190, 83);

        doc.setFont('Helvetica', '')
        doc.text(74, 89, [vendor.get('title'), vendor.get('initials'), vendor.get('surname')].join(' '))
        doc.text(74, 100, [property.get('address1'), property.get('address2'), property.get('address3'), property.get('postcode')])
        doc.text(74, 118, ["Mobile: #{vendor.get('mobile')}", "Email: #{vendor.get('email')}"])
        doc.text(74, 131, [vendor.get('address1'), vendor.get('address2'), vendor.get('address3'), vendor.get('postcode')])

        doc.setFont('Helvetica', 'Bold')

        doc.text(20, 89, 'Vendor:')
        doc.line(20, 93, 190, 93);

        doc.text(20, 100, 'Property:')
        doc.line(20, 114, 190, 114)

        doc.text(20, 118, 'Telephone and contact details:')
        doc.line(20, 125, 190, 125)

        doc.text(20, 131, 'Correspondence address:')

        doc.setFontSize(14)
        doc.text(20, 165, "Offers and Sales Progress")

        doc.setLineWidth(0.4)
        doc.line(20, 168, 190, 168)

        doc.setFontSize(10)
        doc.setFont('Helvetica', 'Oblique')
        doc.text(20, 174, "The following is a record of offers made on your property")

        doc.setLineWidth(0.1)
        doc.line(20, 178, 190, 178)

        doc.setFont('Helvetica', '')

        for offer, i in offers.models
          y = 183 + (i * 8)
          price = parseInt(offer.get('price')).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
          date = new Date(offer.get('date'))
          month = date.toLocaleString("en-us", { month: "long" })

          status = ''
          if offer.get('status') == "Offer Accepted"
            status = 'Accepted'
          else if offer.get('status') == "Offer Rejected"
            status = 'Rejected'
          else
            status = offer.get('status')

          doc.text(20, y, "#{status} offer of £#{price} made by #{offer.get('buyertitle')} #{offer.get('buyersurname')} on #{date.getDate()} #{month} #{date.getFullYear()}")

        #footer
        doc.line(20, 276, 190, 276)
        doc.setFont('Helvetica', 'Bold')
        doc.text(45, 281, "Telephone: #{property.get('negotiator').get('telephone')}    E-mail: #{property.get('negotiator').get('email')}")

        #page 2
        doc.addPage()

        doc.setLineWidth(0.4)
        doc.setFontSize(22);
        #doc.text(20, 20, 'Karl Tatler');
        doc.addImage(logoData, 'PNG', 20, 15, 40, 20);

        doc.setFontSize(18);
        doc.text(20, 50, "Marketing Statistics");
        doc.line(20, 53, 190, 53);

        doc.setFontSize(12);
        doc.setFont('Helvetica', 'Oblique')
        doc.text(20, 59, "The following shows a summary of marketing activity and applicant interest")
        doc.setLineWidth(0.1)
        doc.line(20, 63, 190, 63)

        doc.setFont('Helvetica', '')

        doc.text(20, 69, "#{marketingStats.get('detailssent')} applicants sent details of property")
        doc.line(20, 73, 190, 73)

        doc.text(20, 79, "#{marketingStats.get('viewings')} applicant viewings")
        doc.line(20, 83, 190, 83)

        #legend
        doc.setDrawColor(0)
        doc.setFillColor(64, 143, 179);
        doc.rect(160, 90, 3, 3, 'FD')
        doc.text(166, 92, "page views")

        doc.setFillColor(42, 203, 44);
        doc.rect(160, 95, 3, 3, 'FD')
        doc.text(166, 97, "floorplan downloads")

        doc.setFillColor(42, 92, 253);
        doc.rect(160, 100, 3, 3, 'FD')
        doc.text(166, 102, "pdf downloads")

        doc.text(20, 190, "#{marketingStats.get('pageviews')} property details web site views (#{marketingStats.get('uniquepageviews')} different internet addresses)")

        #footer
        doc.line(20, 276, 190, 276)
        doc.setFont('Helvetica', 'Bold')
        doc.text(45, 281, "Telephone: #{property.get('negotiator').get('telephone')}    E-mail: #{property.get('negotiator').get('email')}")

        #poage 3
        doc.addPage()

        doc.setFont('Helvetica', 'Bold')
        doc.setLineWidth(0.4)

        doc.setFontSize(22);
        #doc.text(20, 20, 'Karl Tatler');
        doc.addImage(logoData, 'PNG', 20, 15, 40, 20);

        doc.setFontSize(18);
        doc.text(20, 50, "Viewings");
        doc.line(20, 53, 190, 53);

        #legend
        doc.setFontSize(10);
        doc.setFont('Helvetica', '')
        doc.setDrawColor(0)

        doc.setFontSize(10);
        doc.setFont('Helvetica', 'Oblique')
        doc.text(20, 148, "The following shows a list of viewing appointments, with any follow up notes recorded.");
        doc.setLineWidth(0.1)
        doc.line(20, 151, 190, 151);

        #footer
        doc.line(20, 276, 190, 276)
        doc.setFont('Helvetica', 'Bold')
        doc.text(45, 281, "Telephone: #{property.get('negotiator').get('telephone')}    E-mail: #{property.get('negotiator').get('email')}")

        ##viewings
        yb = 157
        for viewing, i in viewings.models
          y = yb + ((i%8) * 13)
          x = 20 + (80 * ( (i%16) - (i%8) ) /8)

          date = new Date(viewing.get('datetime'))
          month = date.toLocaleString("en-us", {month: 'short'})
          time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
          followup = viewing.get('followup')
          doc.setFont('Helvetica', 'Bold')
          doc.text(x, y, "#{date.getDate()} #{month} #{date.getFullYear()} #{time}")
          doc.text(x, y+5, "Follow Up:")
          doc.setFont('Helvetica', '')
          doc.text(x+22, y+5, "#{followup}")

          if i == 15
            yb = 30
            doc.addPage()
            doc.line(20, 276, 190, 276)
            doc.setFont('Helvetica', 'Bold')
            doc.text(45, 281, "Telephone: #{property.get('negotiator').get('telephone')}    E-mail: #{property.get('negotiator').get('email')}")


        build_charts = _.map [self._generate_pie_chart(viewingsView), self._generate_line_chart(userInteractionsFloorplans, userInteractionsPageViews, userInteractionsPdfDownloads)], (data) ->
          self._resize_chart_data(data, 1000, 500)

        $.when(build_charts...).done (data...) =>
          doc.setPage(3)
          doc.addImage(data[0], 'PNG', 0, 55, 170, 85) # pie chart
          doc.setPage(2)
          doc.addImage(data[1], 'PNG', 20, 90, 170, 90) # line chart
          $.when(self._generate_pie_legend(window.pdfPieChart)).done (legendData) =>
            doc.setPage(3)
            doc.addImage(legendData, 'PNG', 130, 58, 75, 37.5)
            doc.save("Monthy Vendor report for #{property.get('address1')}.pdf")

    _generate_pie_chart: (viewings)->
      canvas =  document.createElement("canvas")
      canvas.fillStyle = "rgb(255, 255, 255)"
      document.body.appendChild(canvas)
      ctx = canvas.getContext("2d")
      chart  = window.graph_helpers.viewingsPieChart(viewings, ctx, {
        showTooltips: true,
        animation: false,
        tooltipFontFamily: "Helvetica",
        tooltipFontStyle: "normal",
        tooltipFontSize: 32,
        tooltipFontColor: "#fff",
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\" style=\"list-style-type: none;\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"display: inline-block; background-color:<%=segments[i].fillColor%>; width: 10px; height: 10px; border: 1px solid #000; margin-right: 5px;\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
      })
      window.pdfPieChart = chart
      pieChartData = chart.toBase64Image()
      document.body.removeChild(canvas)
      return pieChartData

    _generate_pie_legend: (pie) ->
      canvas = document.createElement('canvas')
      document.body.appendChild(canvas)
      ctx = canvas.getContext('2d')
      legend_html = pie.generateLegend()
      data = 'data:image/svg+xml,' + '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="400">' +
              '<foreignObject width="100%" height="100%">' +
              '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px">' +
              legend_html +
              '</div>' +
              '</foreignObject>' +
              '</svg>'
      img = new Image()
      img.src = data
      p = new jQuery.Deferred()
      img.onload = () ->
        ctx.drawImage(img, 0, 0)
        imgData = canvas.toDataURL()
        p.resolve(imgData)
        document.body.removeChild(canvas)

      return p.promise()



    _generate_line_chart: (fp, pv, pdf) ->
      labels = _.map pv.get('values'), (d, i) ->
        moment(d['start']).format('D MMM');

      chart_data = [{
          label: 'Floorplan Downloads', fillColor: "rgba(220,220,220,0)", strokeColor: "rgba(42, 203, 44, 1)", pointColor: "rgba(42, 203, 44, 1)",
          pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "rgba(220,220,220,1)",
          data: _.map fp.get('values'), (v) ->
              v.quantity
        }, {
          label: 'Website Views', fillColor: "rgba(220,220,220,0)", strokeColor: "rgba(64, 143, 179, 1)", pointColor: "rgba(64, 143, 179, 1)",
          pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "rgba(220,220,220,1)",
          data: _.map pv.get('values'), (v) ->
              v.quantity
        }, {
          label: 'PDF Downloads', fillColor: "rgba(220,220,220,0)", strokeColor: "rgba(42, 92, 253, 1)", pointColor: "rgba(42, 92, 253, 1)",
          pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "rgba(220,220,220,1)",
          data: _.map pdf.get('values'), (v) ->
              v.quantity
        }]

      canvas =  document.createElement("canvas")
      canvas.fillStyle = "rgb(255, 255, 255)"
      document.body.appendChild(canvas)
      ctx = canvas.getContext("2d")
      chart = new Chart(ctx).Line({
        'labels': labels,
        'datasets': chart_data
        }, {
          datasetStrokeWidth : 4,
          datasetFill: true,
          pointDot: true,
          pointDotRadius: 6,
          scaleFontFamily: "Helvetica",
          scaleFontStyle: "normal",
          scaleFontSize: 32,
          scaleFontColor: "#666",
          animation: false
         });

      lineChartData = chart.toBase64Image()
      document.body.removeChild(canvas)
      return lineChartData

    _resize_chart_data: (data, width, height) ->
      canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      ctx = canvas.getContext('2d')
      p = new jQuery.Deferred()
      $("<img/>").attr("src", data).load ->
        ctx.scale(width/this.width, height/this.height)
        ctx.drawImage(this, 0, 0)
        p.resolve(canvas.toDataURL())
      return p.promise()



  }
