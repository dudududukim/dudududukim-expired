console.log("Fetching CSV data...");

fetch('/assets/data/cardioActivities.csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').slice(1); // 헤더 제외
        const activities = rows.map((row, index) => {
            const fields = row.split(',');

            // 필드 길이 검증 (예: 최소 3개의 필드가 있어야 함)
            if (fields.length < 3) {
                console.warn(`Skipping invalid row at index ${index}:`, row);
                return null;
            }

            const [id, date, type, routeName, distance, ...rest] = fields;

            // 날짜 필드 유효성 검사
            if (!date || isNaN(new Date(date))) {
                console.warn(`Invalid date found at index ${index}:`, date);
                return null;
            }

            const parsedDate = new Date(date);
            const month = `${parsedDate.getFullYear()} ${parsedDate.toLocaleString('default', { month: 'short' })}`;;

            // 거리 필드 유효성 검사
            const parsedDistance = parseFloat(distance);
            if (isNaN(parsedDistance)) {
                console.warn(`Invalid distance found at index ${index}:`, distance);
                return null;
            }

            return { month, type: type.trim(), distance: parsedDistance };
        }).filter(row => row !== null); // 유효한 데이터만 포함

        // 월별로 Running, Cycling 거리 집계
        const summary = activities.reduce((acc, curr) => {
            if (!acc[curr.month]) {
                acc[curr.month] = { Running: 0, Cycling: 0 };
            }
            if (curr.type === 'Running' || curr.type === 'Cycling') {
                acc[curr.month][curr.type] += curr.distance || 0;
            }
            return acc;
        }, {});

        // 데이터 준비
        const labels = Object.keys(summary); // 월 라벨
        const runningData = labels.map(month => summary[month].Running); // Running 거리
        const cyclingData = labels.map(month => summary[month].Cycling); // Cycling 거리

        console.log("Summary:", summary);

        // Chart.js를 사용한 데이터 시각화
        const ctx = document.getElementById('activityChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Running (km)',
                        data: runningData,
                        backgroundColor: 'rgba(75, 192, 192, 0.7)',
                        yAxisID: 'y1',
                    },
                    {
                        label: 'Cycling (km)',
                        data: cyclingData,
                        backgroundColor: 'rgba(255, 99, 132, 0.7)',
                        yAxisID: 'y2',
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y1: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Running Distance (km)'
                        }
                    },
                    y2: {
                        type: 'linear',
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Cycling Distance (km)'
                        },
                        grid: {
                            drawOnChartArea: false // 오른쪽 Y축의 그리드 제거
                        }
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error("An error occurred:", error);
    });
